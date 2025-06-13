package com.bakery.backend.controller;

import com.bakery.backend.dto.LoginRequest;
import com.bakery.backend.dto.RegisterRequest;
import com.bakery.backend.model.Account;
import com.bakery.backend.model.ConfirmationToken;
import com.bakery.backend.model.Product;
import com.bakery.backend.repository.AccountRepository;
import com.bakery.backend.repository.ConfirmationTokenRepository;
import com.bakery.backend.repository.ProductRepository;
import com.bakery.backend.service.ForgotPasswordService;
import com.bakery.backend.service.LoginService;
import com.bakery.backend.service.RegistrationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép gọi từ FE Vite
public class AuthController {

    private final RegistrationService registrationService;

    @Autowired private AccountRepository accountRepository;
    @Autowired private LoginService loginService;
    @Autowired private ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired private ForgotPasswordService forgotPasswordService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private ProductRepository productRepository;

    public AuthController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    // ✅ Đăng ký tài khoản
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String result = registrationService.register(request);
            return ResponseEntity.ok(result);
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("❌ Lỗi khi gửi email xác nhận.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("❌ Đăng ký thất bại: " + e.getMessage());
        }
    }

    // ✅ Xác nhận tài khoản từ email
    @GetMapping("/confirm")
    public ResponseEntity<String> confirmToken(@RequestParam("token") String token) {
        Optional<ConfirmationToken> optionalToken = confirmationTokenRepository.findByToken(token);

        if (optionalToken.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Token không hợp lệ!");
        }

        ConfirmationToken confirmationToken = optionalToken.get();

        if (confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("❌ Token đã hết hạn!");
        }

        Account account = confirmationToken.getAccount();
        account.setEnabled(true); // kích hoạt tài khoản
        accountRepository.save(account);

        confirmationTokenRepository.delete(confirmationToken); // Xóa token

        return ResponseEntity.ok("✅ Tài khoản đã được xác nhận thành công!");
    }

    // ✅ Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Vui lòng nhập email!");
        }

        Optional<Account> optionalAccount = loginService.login(request.getEmail(), request.getPassword());

        if (optionalAccount.isEmpty()) {
            return ResponseEntity.status(401).body("❌ Email hoặc mật khẩu không đúng, hoặc tài khoản chưa kích hoạt.");
        }

        Account account = optionalAccount.get();
        session.setAttribute("user", account);

        // 🔐 Token tạm thời
        String jwtToken = "dummy-token"; // TODO: replace with real JWT generation

        // ✅ Trả về token + fullName
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwtToken);
        response.put("fullName", account.getFullname());

        return ResponseEntity.ok(response);
    }


    // ✅ Đăng xuất
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        if (session.getAttribute("user") != null) {
            session.invalidate();
            return ResponseEntity.ok("✅ Đăng xuất thành công!");
        }
        return ResponseEntity.badRequest().body("❌ Bạn chưa đăng nhập!");
    }

    // ✅ Gửi email khôi phục mật khẩu
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
        try {
            String result = forgotPasswordService.processForgotPassword(email);
            return ResponseEntity.ok(result);
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("❌ Lỗi khi gửi email.");
        }
    }

    // ✅ Đặt lại mật khẩu từ email
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam("token") String token,
                                                @RequestParam("newPassword") String newPassword) {
        Optional<ConfirmationToken> optionalToken = confirmationTokenRepository.findByToken(token);
        if (optionalToken.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Token không hợp lệ!");
        }

        ConfirmationToken confirmationToken = optionalToken.get();
        if (confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("❌ Token đã hết hạn!");
        }

        Account account = confirmationToken.getAccount();
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
        confirmationTokenRepository.delete(confirmationToken);

        return ResponseEntity.ok("✅ Mật khẩu đã được đặt lại thành công!");
    }

    // ✅ Lấy danh sách sản phẩm
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    // ✅ Xem chi tiết sản phẩm
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("❌ Không tìm thấy sản phẩm với ID: " + id));
    }
}
