package com.bakery.backend.controller;

import com.bakery.backend.dto.ProductDTO;
import com.bakery.backend.dto.ProductResponseDTO;
import com.bakery.backend.model.Product;
import com.bakery.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép React truy cập API
public class ProductController {

    @Autowired
    private ProductService productService;

    // Lấy toàn bộ sản phẩm
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Lấy 1 sản phẩm theo ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + id));
    }

    // Xoá sản phẩm
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

// ✅ Thêm mới sản phẩm
@PostMapping
public Product addProduct(@RequestBody ProductDTO productDTO) {
    return productService.addProduct(productDTO);
}
    // ✅ Sửa sản phẩm
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        return productService.updateProduct(id, productDTO);
    }
    // API trả về danh sách sản phẩm mới nhất (sắp xếp giảm dần theo ID)
    @GetMapping("/newest")
    public List<ProductResponseDTO> getNewestProducts() {
        return productService.getNewestProducts();
    }
    @GetMapping("/bestsellers")
    public List<ProductResponseDTO> getBestSellingProducts() {
        return productService.getBestSellingProducts();
    }
    @GetMapping("/{id}/view")
    public ProductResponseDTO viewProduct(@PathVariable Long id) {
        return productService.viewProduct(id);
    }
    @GetMapping("/most-viewed")
    public List<ProductResponseDTO> getMostViewedProducts() {
        return productService.getMostViewedProducts();
    }
    @GetMapping("/suggested/{productId}")
    public ResponseEntity<List<ProductResponseDTO>> getSuggestedProducts(@PathVariable Long productId) {
        return ResponseEntity.ok(productService.getSuggestedProductsByCategory(productId));
    }

}
