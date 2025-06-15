package com.bakery.backend.repository;

import com.bakery.backend.model.OrderDetail;
import com.bakery.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    // Truy vấn sản phẩm bán chạy theo tổng số lượng
    @Query("SELECT od.product FROM OrderDetail od GROUP BY od.product ORDER BY SUM(od.quantity) DESC")
    List<Product> findBestSellingProducts();
}
