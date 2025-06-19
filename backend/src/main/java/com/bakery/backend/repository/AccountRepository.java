package com.bakery.backend.repository;

import com.bakery.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    //  Kiểm tra xem username đã tồn tại trong hệ thống chư
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    // Thêm tìm theo username hoặc email
    Optional<Account> findByUsername(String username);
    Optional<Account> findByEmail(String email);

}
