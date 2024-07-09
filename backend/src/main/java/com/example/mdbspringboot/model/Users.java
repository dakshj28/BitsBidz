package com.example.mdbspringboot.model;

import java.sql.Time;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;
import com.example.mdbspringboot.model.Notif;


@Document("users")
public class Users {
    @Id
    private String userId;
    private String name;
    private String email;
    private String sessionId;
    private String phone;
    private String hostel;
    private int balance;
    private String[] myBids;
    private String[] myItems;
    private String[] myRooms;
    private Notif[] myNotifs;

    public Users(String userId, String name, String phone, String email, String hostel, String sessionId) {

        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.hostel = hostel;
        this.sessionId = sessionId;

        this.balance = 5000;

        this.myBids = new String[]{};
        this.myItems = new String[]{};
        this.myRooms = new String[]{};
        this.myNotifs = new Notif[]{};

    }

    public String getUserId() {
        return userId;
    }

    public void setSessionId(String newSessionId) {
        this.sessionId = newSessionId;
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getName() {
        return name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhone() {
        return phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getHostel() {
        return hostel;
    }

    public void setHostel(String newHostel) {
        this.hostel = newHostel;
    }

    public void setBalance(int newBalance) {
        this.balance = newBalance;
    }

    public int getBalance() {
        return balance;
    }

    public void setMyBids(String[] myBids) {
        this.myBids = myBids;
    }

    public String[] getMyBids() {
        return myBids;
    }

    public void setMyItems(String[] myItems) {
        this.myItems = myItems;
    }

    public String[] getMyItems() {
        return myItems;
    }

    public void setMyRooms(String[] myRooms) {
        this.myRooms = myRooms;
    }

    public String[] getMyRooms() {
        return myRooms;
    }

    public void setMyNotifs(Notif[] myNotifs) {
        this.myNotifs = myNotifs;
    }

    public Notif[] getMyNotifs() {
        return myNotifs;
    }

    public void addNotif(Notif notif){
        Notif[] newNotifs = new Notif[myNotifs.length + 1];
        for (int i = 0; i < myNotifs.length; i++) {
            newNotifs[i] = myNotifs[i];
        }
        newNotifs[myNotifs.length] = notif;
        this.myNotifs = newNotifs;
    }

    public void addBid(String bidId){
        String[] newBids = new String[myBids.length + 1];
        for (int i = 0; i < myBids.length; i++) {
            newBids[i] = myBids[i];
        }
        newBids[myBids.length] = bidId;
        this.myBids = newBids;
    }

    public void addItem(String itemId){
        String[] newItems = new String[myItems.length + 1];
        for (int i = 0; i < myItems.length; i++) {
            newItems[i] = myItems[i];
        }
        newItems[myItems.length] = itemId;
        this.myItems = newItems;
    }

    public void addRoom(String roomId){
        String[] newRooms = new String[myRooms.length + 1];
        for (int i = 0; i < myRooms.length; i++) {
            newRooms[i] = myRooms[i];
        }
        newRooms[myRooms.length] = roomId;
        this.myRooms = newRooms;
    }

}
