package com.bakery.backend.service;

import com.bakery.backend.dto.ProductDTO;
import com.bakery.backend.dto.ProductResponseDTO;
import com.bakery.backend.model.Brand;
import com.bakery.backend.model.Category;
import com.bakery.backend.model.Image;
import com.bakery.backend.model.Product;
import com.bakery.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

//    @Autowired
//    private BrandService brandService;
//
//    @Autowired
//    private CategoryService categoryService;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

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
    public Product addProduct(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setView(0L); // mặc định

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu"));

        product.setCategory(category);
        product.setBrand(brand);

        Product savedProduct = productRepository.save(product);

        // Lưu hình ảnh
        List<Image> images = new ArrayList<>();
        for (String link : dto.getImageLinks()) {
            Image img = new Image();
            img.setImageLink(link);
            img.setProduct(savedProduct);
            images.add(img);
        }

        imageRepository.saveAll(images);
        savedProduct.setImages(images);

        return savedProduct;
    }
    public Product updateProduct(Long id, ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());

        // Cập nhật danh mục và thương hiệu
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));
        product.setCategory(category);

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu"));
        product.setBrand(brand);

        // ✅ Xóa tất cả ảnh cũ trong DB
        imageRepository.deleteAll(product.getImages());

        // ✅ Tạo list mới các ảnh và gán lại
        List<Image> newImages = new ArrayList<>();
        for (String link : dto.getImageLinks()) {
            Image img = new Image();
            img.setImageLink(link);
            img.setProduct(product);
            newImages.add(img);
        }
        product.getImages().clear();                // Xóa ảnh cũ (orphanRemoval có hiệu lực)
        for (Image image : newImages) {
            image.setProduct(product);              // Gắn lại quan hệ cha
            product.getImages().add(image);         // Thêm ảnh mới
        }


        return productRepository.save(product);
    }

    private ProductResponseDTO mapToDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setBrandName(product.getBrand().getName());
        dto.setCategoryName(product.getCategory().getName());
        dto.setImageLinks(product.getImages().stream()
                .map(Image::getImageLink)
                .toList());
        return dto;
    }
    public List<ProductResponseDTO> getNewestProducts() {
        return productRepository.findAllByOrderByIdDesc().stream()
                .map(this::mapToDTO)
                .toList();
    }


    public List<ProductResponseDTO> getBestSellingProducts() {
        return orderDetailRepository.findBestSellingProducts().stream()
                .map(this::mapToDTO)
                .toList();
    }
    public ProductResponseDTO viewProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Tăng lượt xem
        product.setView(product.getView() != null ? product.getView() + 1 : 1);
        productRepository.save(product);

        return mapToDTO(product);
    }
    //10 san pham co view cao nhat
    public List<ProductResponseDTO> getMostViewedProducts() {
        return productRepository.findTop10ByOrderByViewDesc().stream()
                .map(this::mapToDTO)
                .toList();
    }
    public List<ProductResponseDTO> getSuggestedProductsByCategory(Long productId) {
        // Tìm sản phẩm gốc
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Lấy các sản phẩm cùng danh mục, loại trừ sản phẩm đang xem
        List<Product> suggested = productRepository.findByCategoryAndIdNot(product.getCategory(), product.getId());

        // Chuyển sang DTO
        return suggested.stream()
                .map(this::mapToDTO)
                .toList();
    }



}