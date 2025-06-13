package com.bakery.backend.service;

import com.bakery.backend.model.Account;
import com.bakery.backend.model.ConfirmationToken;
import com.bakery.backend.repository.AccountRepository;
import com.bakery.backend.repository.ConfirmationTokenRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class ForgotPasswordService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    public String processForgotPassword(String email) throws MessagingException {
        Optional<Account> optionalAccount = accountRepository.findByEmail(email);
        if (optionalAccount.isEmpty()) {
            return "❌ Email không tồn tại trong hệ thống!";
        }

        Account account = optionalAccount.get();

        // Tạo token đặt lại mật khẩu
        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken();
        confirmationToken.setToken(token);
        confirmationToken.setCreatedAt(LocalDateTime.now());
        confirmationToken.setExpiresAt(LocalDateTime.now().plusMinutes(30));
        confirmationToken.setAccount(account);
        confirmationTokenRepository.save(confirmationToken);

        // Gửi email đặt lại mật khẩu
        sendResetPasswordEmail(email, token);

        return "✅ Đã gửi email đặt lại mật khẩu đến " + email;
    }

    public void sendResetPasswordEmail(String toEmail, String resetToken) throws MessagingException {
        String resetLink = "http://localhost:8080/api/auth/reset-password?token=" + resetToken;

        String subject = "🔐 Khôi phục mật khẩu tài khoản Bakery";
        String body = "<p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu của bạn.</p>" +
                "<p>Nhấp vào liên kết dưới đây để đặt lại mật khẩu:</p>" +
                "<p><a href=\"" + resetLink + "\">Đặt lại mật khẩu</a></p>" +
                "<p>Liên kết này sẽ hết hạn sau 30 phút.</p>" +
                "<br><p>Nếu bạn không yêu cầu khôi phục mật khẩu, hãy bỏ qua email này.</p>" +
                "<hr><p>💌 Bakery Team</p>";

        emailService.sendVerificationEmail(toEmail, subject, body);
    }

}
