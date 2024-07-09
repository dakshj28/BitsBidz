package com.example.mdbspringboot.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.mdbspringboot.model.Users;

public interface UsersRepository extends MongoRepository<Users, String> {

    @Query("{_id:'?0'}")
    Users findUserById(String userId);

    public long count();

}