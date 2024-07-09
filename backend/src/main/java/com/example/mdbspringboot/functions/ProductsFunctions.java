package com.example.mdbspringboot.functions;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.mdbspringboot.model.Products;
import com.example.mdbspringboot.repository.ProductsRepository;

@EnableMongoRepositories
public class ProductsFunctions {

    @Autowired
	ProductsRepository productsRepo;

    public void printItem(Products item){
        System.out.println("Item Id: " + item.getProductId());
        System.out.println("Item Name: " + item.getName());
        System.out.println("Item Description: " + item.getDesc());
    }

    public Set<Products> searchedItems(String search, List<Products> products){

		Set<Products> searchedProducts = new HashSet<Products>();

		for (Products product : products) {
			String prodName = product.getName().toLowerCase();
			String searched = search.toLowerCase();
			if (product.getSold() == false){
               if(prodName.contains(searched)){
			    	searchedProducts.add(product);
			    }
            }
		}

        return searchedProducts;

    }

}
