package com.bakery.backend.controller;

import com.bakery.backend.dto.OrderRequestDTO;
import com.bakery.backend.dto.OrderResponseDTO;
import com.bakery.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend (React, Angular, v.v.)
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequestDTO orderRequest) {
        try {
            OrderResponseDTO response = orderService.placeOrder(orderRequest);
            return ResponseEntity.ok(response); // JSON trả về đẹp, chuẩn
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
