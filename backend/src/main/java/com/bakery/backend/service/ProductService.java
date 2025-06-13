package com.bakery.backend.service;

import com.bakery.backend.dto.ProductDTO;
import com.bakery.backend.model.Brand;
import com.bakery.backend.model.Category;
import com.bakery.backend.model.Image;
import com.bakery.backend.model.Product;
import com.bakery.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandService brandService;

    @Autowired
    private CategoryService categoryService;

    // Lấy tất cả sản phẩm
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Lấy sản phẩm theo ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Xoá sản phẩm
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }



}