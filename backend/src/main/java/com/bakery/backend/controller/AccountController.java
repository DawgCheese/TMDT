package com.bakery.backend.controller;

import com.bakery.backend.dto.UpdateAccountRequest;
import com.bakery.backend.model.Account;
import com.bakery.backend.repository.AccountRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    // ✅ Cập nhật thông tin cá nhân (không cho đổi email)
    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateAccountRequest request,
                                           HttpSession session) {
        Account sessionUser = (Account) session.getAttribute("user");
        if (sessionUser == null) {
            return ResponseEntity.status(401).body("❌ Bạn chưa đăng nhập.");
        }

        Optional<Account> optionalAccount = accountRepository.findById(sessionUser.getId());
        if (optionalAccount.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Account account = optionalAccount.get();
        account.setFullname(request.getFullname());
        account.setPhone(request.getPhone());
        account.setAddress(request.getAddress());
        // ❌ KHÔNG cập nhật email

        accountRepository.save(account);

        return ResponseEntity.ok("✅ Cập nhật thông tin thành công (ngoại trừ email).");
    }
    @GetMapping("/me")
    public ResponseEntity<?> getProfile(HttpSession session) {
        Account sessionUser = (Account) session.getAttribute("user");
        if (sessionUser == null) {
            return ResponseEntity.status(401).body("❌ Bạn chưa đăng nhập.");
        }

        Optional<Account> optionalAccount = accountRepository.findById(sessionUser.getId());
        if (optionalAccount.isEmpty()) {
            return ResponseEntity.status(404).body("❌ Không tìm thấy người dùng.");
        }

        Account account = optionalAccount.get();

        Map<String, Object> response = new HashMap<>();
        response.put("id", account.getId());
        response.put("fullname", account.getFullname());
        response.put("email", account.getEmail());
        response.put("phone", account.getPhone());
        response.put("address", account.getAddress());

        return ResponseEntity.ok(response);
    }

}
