package com.bakery.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderHistoryResponseDTO {
    private Long orderId;
    private LocalDateTime createDate;
    private Double total;
    private String status;
    private String address;
    private List<OrderHistoryItemDTO> items;

    // Constructors
    public OrderHistoryResponseDTO() {}

    public OrderHistoryResponseDTO(Long orderId, LocalDateTime createDate, Double total, String status, String address, List<OrderHistoryItemDTO> items) {
        this.orderId = orderId;
        this.createDate = createDate;
        this.total = total;
        this.status = status;
        this.address = address;
        this.items = items;
    }

    // Getters and Setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<OrderHistoryItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderHistoryItemDTO> items) {
        this.items = items;
    }
}
