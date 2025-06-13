package com.bakery.backend.service;

import com.bakery.backend.model.Category;
import com.bakery.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository CategoryRepository;

    public Category getOrCreateByName(String name) {
        return CategoryRepository.findByName(name)
                .orElseGet(() -> CategoryRepository.save(new Category(null, name)));
    }

    // Các hàm khác nếu cần (ví dụ: getAllBrands, deleteById...)
}

