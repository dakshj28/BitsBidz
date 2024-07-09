package com.example.mdbspringboot.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.mdbspringboot.model.ChatRooms;

public interface ChatRoomsRepository extends MongoRepository<ChatRooms, String> {

	@Query("{_id:'?0'}")
	ChatRooms findChatRoomById(String roomId);

    @Query("{}")
    List<ChatRooms> findAll();

	public long count();

}
