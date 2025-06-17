package com.bakery.backend.repository;

import com.bakery.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // đã có sẵn findById(Long id)
}
