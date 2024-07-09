package com.example.mdbspringboot.functions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.mdbspringboot.model.Users;
import com.example.mdbspringboot.repository.UsersRepository;

public class UsersFunctions {
    @Autowired
	UsersRepository usersRepo;

    public void printUser(Users user){
		System.out.println("User Id: " + user.getUserId());
		System.out.println("User Name: " + user.getName());
		System.out.println("User Phone: " + user.getPhone());
		System.out.println("User Email: " + user.getEmail());
		String[] myBids = user.getMyBids();
		System.out.println("User Bids: ");
		for(String bid: myBids){
			System.out.println(bid);
		}
	}

}
