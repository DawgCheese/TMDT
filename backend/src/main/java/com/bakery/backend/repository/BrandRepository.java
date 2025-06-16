package com.bakery.backend.repository;

import com.bakery.backend.model.Brand;
import org.springframework.data.repository.CrudRepository;

public interface BrandRepository extends CrudRepository<Brand, Long> {
}
