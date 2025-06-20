package com.bakery.backend.controller;

import com.bakery.backend.dto.PaymentRequest;
import com.bakery.backend.model.Order;
import com.bakery.backend.model.OrderStatus;
import com.bakery.backend.repository.OrderRepository;
import com.bakery.backend.repository.OrderStatusRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
public class CheckoutController {

    private final PayOS payOS;
    private final OrderRepository orderRepository;
    private final OrderStatusRepository orderStatusRepository;
    public CheckoutController(PayOS payOS, OrderRepository orderRepository, OrderStatusRepository orderStatusRepository) {
        this.payOS = payOS;
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
    }
    // ✅ 1. Tạo link thanh toán
    @PostMapping("/create")
    public ResponseEntity<?> createPaymentLink(@RequestBody PaymentRequest requestBody, HttpServletRequest request) {
        try {
            Long orderId = requestBody.getOrderId();
            Order order = orderRepository.findById(orderId).orElse(null);

            if (order == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng!");
            }

            final String baseUrl = getBaseUrl(request);
            final String returnUrl = baseUrl + "/api/payment/success?orderId=" + order.getId();
            final String cancelUrl = baseUrl + "/api/payment/cancel?orderId=" + order.getId();
            final int amount = order.getTotal().intValue();  // total là Double → int

            // Tạo mã đơn hàng duy nhất
            String currentTimeString = String.valueOf(new Date().getTime());
            long orderCode = Long.parseLong(currentTimeString.substring(currentTimeString.length() - 6));

            // Tạo danh sách item
            List<ItemData> items = order.getOrderDetails().stream().map(detail ->
                    ItemData.builder()
                            .name(detail.getProduct().getName())
                            .quantity(detail.getQuantity())
                            .price(detail.getPrice().intValue())  // cần ép kiểu sang int
                            .build()
            ).toList();

            PaymentData paymentData = PaymentData.builder()
                    .orderCode(orderCode)
                    .amount(amount)
                    .description("Thanh toán đơn hàng #" + order.getId())
                    .returnUrl(returnUrl)
                    .cancelUrl(cancelUrl)
                    .items(items)
                    .build();

            CheckoutResponseData data = payOS.createPaymentLink(paymentData);

            return ResponseEntity.ok().body(Map.of("url", data.getCheckoutUrl()));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi tạo link thanh toán: " + e.getMessage());
        }
    }
    // ✅ 2. Xử lý thành công
    @GetMapping("/success")
    public void handlePaymentSuccess(@RequestParam("orderId") Long orderId,
                                     HttpServletResponse response) throws IOException {
        updateOrderStatus(orderId, "confirmed");
        response.sendRedirect("http://localhost:5173/dat-hang-thanh-cong?orderId=" + orderId);

    }


    // ✅ 3. Xử lý hủy thanh toán
    @GetMapping("/cancel")
    public void handlePaymentCancel(@RequestParam("orderId") Long orderId, HttpServletResponse response) throws IOException {
        updateOrderStatus(orderId, "cancelled");
        response.sendRedirect("http://localhost:5173/thanh-toan-that-bai");
    }


    // ✅ 4. Hàm cập nhật trạng thái đơn hàng
    private ResponseEntity<?> updateOrderStatus(Long orderId, String statusName) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            return ResponseEntity.badRequest().body("Không tìm thấy đơn hàng!");
        }

        Optional<OrderStatus> status = orderStatusRepository.findByName(statusName);
        if (status.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy trạng thái: " + statusName);
        }

        order.setOrderStatus(status.orElse(null));
        orderRepository.save(order);

        return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công: " + statusName);
    }

    private String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String contextPath = request.getContextPath();

        String url = scheme + "://" + serverName;
        if ((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") && serverPort != 443)) {
            url += ":" + serverPort;
        }
        url += contextPath;
        return url;
    }


}
