package com.guillermo.TestTecnico.service;

import com.guillermo.TestTecnico.model.Product;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

/**
 * User: José Guillermo Yánez
 * Date:2022-08-11
 * Time: 22:48
 */

public interface ProductService {

    List<Product> findAll();

    /**
     * finds a product by its ID
     * @param id    Database ID of product
     * @return          product
     */

    /**
     *
     * @param id
     * @return product
     */

    Optional<Product> findById(Long id);

    /**
     * Save of product
     * @param product
     * @return Product
     */
    Product save(Product product);

    void delete(Product product);

    public Long max();



}
