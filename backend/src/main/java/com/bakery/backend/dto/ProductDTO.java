package com.bakery.backend.dto;

import java.util.List;

public class ProductDTO {
    private String name;
    private String description;
    private double price;
    private Long brandId;           // ✅ Thay bằng ID
    private Long categoryId;        // ✅ Thay bằng ID
    private List<String> imageLinks;

    // Getters & Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public Long getBrandId() { return brandId; }
    public void setBrandId(Long brandId) { this.brandId = brandId; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public List<String> getImageLinks() { return imageLinks; }
    public void setImageLinks(List<String> imageLinks) { this.imageLinks = imageLinks; }
}
