package com.example.mdbspringboot.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.mdbspringboot.model.Products;

public interface ProductsRepository extends MongoRepository<Products, String> {

	@Query("{_id:'?0'}")
	Products findProductById(String productId);

    @Query("{}")
    List<Products> findAll();

	public long count();

}
