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

    public Iterable<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Optional<Brand> getBrandById(Long id) {
        return brandRepository.findById(id);
    }

    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    public Optional<Brand> updateBrand(Long id, Brand newBrand) {
        return brandRepository.findById(id).map(brand -> {
            brand.setName(newBrand.getName());
            return brandRepository.save(brand);
        });
    }

    public boolean deleteBrand(Long id) {
        if (brandRepository.existsById(id)) {
            brandRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
