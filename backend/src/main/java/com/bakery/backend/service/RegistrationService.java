package com.bakery.backend.service;

import com.bakery.backend.dto.RegisterRequest;
import com.bakery.backend.model.Account;
import com.bakery.backend.model.ConfirmationToken;
import com.bakery.backend.repository.AccountRepository;
import com.bakery.backend.repository.ConfirmationTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class RegistrationService {

    private final AccountRepository accountRepository;
    private final ConfirmationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;  // bạn cần tạo service này gửi mail

    public RegistrationService(AccountRepository accountRepository,
                               ConfirmationTokenRepository tokenRepository,
                               PasswordEncoder passwordEncoder,
                               EmailService emailService) {
        this.accountRepository = accountRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public String register(RegisterRequest request) throws MessagingException {
        if (accountRepository.existsByUsername(request.username)) {
            return "Tên đăng nhập đã tồn tại!";
        }
        if (accountRepository.existsByEmail(request.email)) {
            return "❌ Email đã được sử dụng!";
        }

        Account account = new Account();
        account.setUsername(request.username);
        account.setPassword(passwordEncoder.encode(request.password));
        account.setFullname(request.fullname);
        account.setEmail(request.email);
        account.setPhone(request.phone);
        account.setAddress(request.address);
        account.setRoleId(1L);
        account.setEnabled(false);  // chưa kích hoạt

        accountRepository.save(account);

        // Tạo token xác nhận
        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                account,
                LocalDateTime.now(),
                LocalDateTime.now().plusHours(24)  // token hết hạn 24h
        );

        tokenRepository.save(confirmationToken);

        // Gửi mail xác nhận
        String link = "http://localhost:8080/api/auth/confirm?token=" + token;
        String body = "<p>Chào " + account.getFullname() + ",</p>"
                + "<p>Vui lòng bấm vào link bên dưới để kích hoạt tài khoản:</p>"
                + "<a href=\"" + link + "\">Kích hoạt tài khoản</a>";

        emailService.sendVerificationEmail(account.getEmail(), "Xác nhận đăng ký tài khoản", body);

        return "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.";
    }
}
