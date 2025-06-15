package com.bakery.backend.repository;

import com.bakery.backend.model.Category;
import com.bakery.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Trả về danh sách sản phẩm theo thứ tự mới nhất (ID giảm dần)
    List<Product> findAllByOrderByIdDesc();
    // Trả về Top 10 sản phẩm có lượt xem cao nhất
    List<Product> findTop10ByOrderByViewDesc();
    // goi y theo danh muc
    List<Product> findByCategoryAndIdNot(Category category, Long id);

}
