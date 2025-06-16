package com.bakery.backend.service;

import com.bakery.backend.model.Category;
import com.bakery.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service // Đánh dấu là lớp service để Spring quản lý
public class CategoryService {

    @Autowired // Tự động inject repository
    private CategoryRepository categoryRepository;

    // Lấy danh mục theo ID
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    // Tạo danh mục mới
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Lấy tất cả danh mục
    public Iterable<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Cập nhật danh mục theo ID
    public Optional<Category> updateCategory(Long id, Category newCategory) {
        return categoryRepository.findById(id).map(category -> {
            category.setName(newCategory.getName());
            return categoryRepository.save(category);
        });
    }

    // Xóa danh mục theo ID
    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
