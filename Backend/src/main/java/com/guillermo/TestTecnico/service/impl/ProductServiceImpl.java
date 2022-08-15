package com.guillermo.TestTecnico.service.impl;

import com.guillermo.TestTecnico.model.Product;
import com.guillermo.TestTecnico.repository.ProductRepository;
import com.guillermo.TestTecnico.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * User: José Guillermo Yánez
 * Date:2022-08-11
 * Time: 22:44
 */
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        product.setHora(Instant.now().atZone(ZonedDateTime.now().getZone()));
        return productRepository.save(product);
    }

    @Override
    public void delete(Product product) {
        productRepository.delete(product);

    }

    @Override
    public Long max() {
        return productRepository.max();
    }
}
