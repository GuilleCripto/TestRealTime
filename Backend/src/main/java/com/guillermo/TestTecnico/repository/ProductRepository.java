package com.guillermo.TestTecnico.repository;

import com.guillermo.TestTecnico.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.math.BigInteger;

public interface ProductRepository  extends JpaRepository<Product, Long> {
    // all crud database methods
    @Query(value = "SELECT max(id) FROM Product")
    public Long max();
}

