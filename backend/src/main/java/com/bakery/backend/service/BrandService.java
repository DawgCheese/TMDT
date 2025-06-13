package com.bakery.backend.service;

import com.bakery.backend.model.Brand;
import com.bakery.backend.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public Brand getOrCreateByName(String name) {
        return brandRepository.findByName(name)
                .orElseGet(() -> brandRepository.save(new Brand(null, name)));
    }

    // Các hàm khác nếu cần (ví dụ: getAllBrands, deleteById...)
}

