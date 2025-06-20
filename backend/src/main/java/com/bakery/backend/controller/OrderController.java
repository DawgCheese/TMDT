package com.bakery.backend.controller;

import com.bakery.backend.dto.OrderHistoryResponseDTO;
import com.bakery.backend.dto.OrderRequestDTO;
import com.bakery.backend.dto.OrderResponseDTO;
import com.bakery.backend.model.Account;
import com.bakery.backend.repository.AccountRepository;
import com.bakery.backend.service.OrderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend (React, Angular, v.v.)
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private AccountRepository accountRepository;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequestDTO orderRequest) {
        try {
            OrderResponseDTO response = orderService.placeOrder(orderRequest);
            return ResponseEntity.ok(response); // JSON trả về đẹp, chuẩn
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @GetMapping("/history")
    public List<OrderHistoryResponseDTO> getOrderHistoryForCurrentUser(HttpSession session) {
        Account account = (Account) session.getAttribute("user");
        if (account == null) {
            throw new RuntimeException("Bạn chưa đăng nhập!");
        }
        return orderService.getOrderHistoryByAccountId(account.getId());
    }


}
