package com.bakery.backend.service;

import com.bakery.backend.model.Category;
import com.bakery.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    // (Tuỳ chọn) Thêm category
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // (Tuỳ chọn) Lấy toàn bộ category
    public Iterable<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
