package com.bakery.backend.dto;

import java.util.List;

public class ProductResponseDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String brandName;
    private String categoryName;
    private List<String> imageLinks;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getBrandName() { return brandName; }
    public void setBrandName(String brandName) { this.brandName = brandName; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public List<String> getImageLinks() { return imageLinks; }
    public void setImageLinks(List<String> imageLinks) { this.imageLinks = imageLinks; }
}
