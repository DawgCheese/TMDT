package com.bakery.backend.service;

import com.bakery.backend.dto.OrderItemDTO;
import com.bakery.backend.dto.OrderItemResponseDTO;
import com.bakery.backend.dto.OrderRequestDTO;
import com.bakery.backend.dto.OrderResponseDTO;
import com.bakery.backend.model.*;
import com.bakery.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    public OrderResponseDTO placeOrder(OrderRequestDTO request) {
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản"));

        OrderStatus pendingStatus = orderStatusRepository.findByName("pending")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy trạng thái đơn hàng 'pending'"));

        Order order = new Order();
        order.setAccount(account);
        order.setAddress(request.getAddress());
        order.setOrderStatus(pendingStatus);
        order.setCreateDate(LocalDateTime.now());

        List<OrderDetail> orderDetails = new ArrayList<>();
        List<OrderItemResponseDTO> itemResponses = new ArrayList<>();
        double total = 0;

        for (OrderItemDTO item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + item.getProductId()));

            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setProduct(product);
            detail.setQuantity(item.getQuantity());
            detail.setPrice(product.getPrice());
            orderDetails.add(detail);

            total += product.getPrice() * item.getQuantity();

            OrderItemResponseDTO responseItem = new OrderItemResponseDTO();
            responseItem.setProductId(product.getId());
            responseItem.setProductName(product.getName());
            responseItem.setPrice(product.getPrice());
            responseItem.setQuantity(item.getQuantity());
            itemResponses.add(responseItem);
        }

        order.setTotal(total);
        order.setOrderDetails(orderDetails);
        Order savedOrder = orderRepository.save(order);

        OrderResponseDTO response = new OrderResponseDTO();
        response.setOrderId(savedOrder.getId());
        response.setAccountName(account.getFullname());
        response.setStatus(pendingStatus.getName());
        response.setTotal(total);
        response.setAddress(order.getAddress());
        response.setCreateDate(order.getCreateDate());
        response.setItems(itemResponses);

        return response;
    }
}
