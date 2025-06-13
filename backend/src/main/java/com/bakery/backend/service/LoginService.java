package com.bakery.backend.service;

import com.bakery.backend.model.Account;
import com.bakery.backend.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<Account> login(String email, String password) {
        Optional<Account> optionalAccount = accountRepository.findByEmail(email);

        if (optionalAccount.isEmpty()) return Optional.empty();

        Account account = optionalAccount.get();

        if (account.getEnabled() == null || !account.getEnabled()) return Optional.empty();

        if (!passwordEncoder.matches(password, account.getPassword())) return Optional.empty();

        return Optional.of(account);
    }
}
