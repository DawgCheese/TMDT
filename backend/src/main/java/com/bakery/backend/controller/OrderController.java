package com.bakery.backend.controller;

import com.bakery.backend.dto.OrderHistoryResponseDTO;
import com.bakery.backend.dto.OrderItemResponseDTO;
import com.bakery.backend.dto.OrderRequestDTO;
import com.bakery.backend.dto.OrderResponseDTO;
import com.bakery.backend.model.Account;
import com.bakery.backend.model.Order;
import com.bakery.backend.repository.AccountRepository;
import com.bakery.backend.repository.OrderRepository;
import com.bakery.backend.service.OrderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend (React, Angular, v.v.)
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    OrderRepository orderRepositoryl;

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
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderDetail(@PathVariable Long orderId) {
        Order order = orderRepositoryl.findById(orderId).orElse(null);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        OrderResponseDTO response = new OrderResponseDTO();
        response.setOrderId(order.getId());
        response.setAccountName(order.getAccount().getFullname());
        response.setStatus(order.getOrderStatus().getName());
        response.setTotal(order.getTotal());
        response.setAddress(order.getAddress());
        response.setCreateDate(order.getCreateDate());

        List<OrderItemResponseDTO> items = order.getOrderDetails().stream().map(detail -> {
            OrderItemResponseDTO dto = new OrderItemResponseDTO();
            dto.setProductName(detail.getProduct().getName());
            dto.setQuantity(detail.getQuantity());
            dto.setPrice(detail.getPrice());
            // Không cần setImage
            return dto;
        }).collect(Collectors.toList());

        response.setItems(items);
        return ResponseEntity.ok(response);
    }

}
