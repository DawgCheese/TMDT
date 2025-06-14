package com.bakery.backend.service;

import com.bakery.backend.model.Brand;
import com.bakery.backend.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public Optional<Brand> getBrandById(Long id) {
        return brandRepository.findById(id);
    }

    // (Tuỳ chọn) Thêm brand
    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    // (Tuỳ chọn) Lấy toàn bộ brand
    public Iterable<Brand> getAllBrands() {
        return brandRepository.findAll();
    }
}
