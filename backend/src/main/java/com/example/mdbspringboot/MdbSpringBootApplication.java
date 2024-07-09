package com.example.mdbspringboot;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.example.mdbspringboot.model.Users;
import com.example.mdbspringboot.functions.UsersFunctions;
import com.example.mdbspringboot.repository.UsersRepository;

import com.example.mdbspringboot.model.Products;
import com.example.mdbspringboot.functions.ProductsFunctions;
import com.example.mdbspringboot.repository.ProductsRepository;


@SpringBootApplication
@EnableMongoRepositories
public class MdbSpringBootApplication implements CommandLineRunner{

	@Autowired
	ProductsRepository productsRepo;
	ProductsFunctions productFunctions = new ProductsFunctions();

	@Autowired
	UsersRepository usersRepo;
	UsersFunctions userFunctions = new UsersFunctions();

	public static void main(String[] args) {
		SpringApplication.run(MdbSpringBootApplication.class, args);
	}

	public void run(String... args) {

		System.out.println("Starting the application...");

		System.out.println("Application finished running.");

	}

}

