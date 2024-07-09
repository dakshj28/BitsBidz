package com.example.mdbspringboot.controllers;

import org.springframework.web.bind.annotation.*;

import java.util.*;

import org.springframework.web.client.RestTemplate;

import com.example.mdbspringboot.model.Products;
import com.example.mdbspringboot.repository.ProductsRepository;
import com.example.mdbspringboot.functions.ProductsFunctions;

import com.example.mdbspringboot.model.Users;
import com.example.mdbspringboot.repository.UsersRepository;
import com.example.mdbspringboot.functions.UsersFunctions;

import com.example.mdbspringboot.model.ChatRooms;
import com.example.mdbspringboot.repository.ChatRoomsRepository;

import com.example.mdbspringboot.model.Message;

import com.example.mdbspringboot.model.Notif;

import java.util.HashMap;
import java.util.List;

import javax.management.Notification;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.mashape.unirest.http.*;
import org.json.JSONObject;

@RestController
public class GreetingController {

    @Autowired
    ProductsRepository productsRepo;
    ProductsFunctions productFunctions = new ProductsFunctions();

    @Autowired
    UsersRepository usersRepo;
    UsersFunctions userFunctions = new UsersFunctions();

    @Autowired
    ChatRoomsRepository chatRoomsRepo;

    public void notify(String userId, String productId, String message, String productName, String productImage) {
        Users user = usersRepo.findUserById(userId);
        Notif notif = new Notif(message, productId, System.currentTimeMillis() / 1000, productName, productImage);
        user.addNotif(notif);
        usersRepo.save(user);
    }

    int projectedBalance(Users user) {
        String[] allBids = user.getMyBids();
        int expectedBalance = 0;
        for (String bid : allBids) {
            Products product = productsRepo.findProductById(bid);
            expectedBalance += product.getCurrBidVal();
        }
        return expectedBalance;
    }

    @GetMapping("/hello")
    String hello() {
        return "Hello World";
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/user-account")
    Users getUser(@RequestBody HashMap<String, String> body) {
        String userId = body.get("userId");
        Users user = usersRepo.findUserById(userId);
        return user;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/user-account-update")
    Users getUserUpdate(@RequestBody HashMap<String, String> body) {
        String userId = body.get("userId");
        Users user = usersRepo.findUserById(userId);
        user.setPhone(body.get("phone"));
        user.setHostel(body.get("hostel"));
        usersRepo.save(user);
        return user;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/items")
    Set<Products> getAllItems(@RequestBody HashMap<String, String> body) {

        String search = body.get("search");
        List<Products> products = productsRepo.findAll();
        Set<Products> searchedItems = productFunctions.searchedItems(search, products);

        for (Products product : searchedItems) {
            productFunctions.printItem(product);
        }

        return searchedItems;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @RequestMapping(value = "/items/{id}", method = { RequestMethod.GET, RequestMethod.POST })
    Products getItems(@PathVariable String id) {
        System.out.println(id);
        Products product = productsRepo.findProductById(id);

        return product;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/user/mybiddings")
    Set<Products> myBiddings(@RequestBody HashMap<String, String> body) {
        String userId2 = body.get("userId");
        System.out.println(userId2);
        Users user = usersRepo.findUserById(userId2);

        String[] allBids = user.getMyBids();

        Set<Products> productlist = new HashSet<>();
        for (String productId: allBids){
            productlist.add(productsRepo.findProductById(productId));
        }

        return productlist;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/user/mylistings")
    Set<Products> myListings(@RequestBody HashMap<String, String> body) {
        String userId = body.get("userId");
        Users user = usersRepo.findUserById(userId);

        String[] allProducts = user.getMyItems();
        Set<Products> productlist = new HashSet<>(); // Initialize the Set

        for (String productId : allProducts) {
            productlist.add(productsRepo.findProductById(productId));
        }

        return productlist;
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/items/{id}/newbid")
    String itemNewBid(@PathVariable String id, @RequestBody HashMap<String, String> body) {

        String userId = body.get("userId");
        String bid = body.get("bid");

        Products product = productsRepo.findProductById(id);
        Users user = usersRepo.findUserById(userId);

        if (!userId.equals(product.getOwnerId())) {
            if (user.getBalance() > projectedBalance(user) + Integer.parseInt(bid)) {
                String oldBidder = product.getCurrBidId();
                Boolean result = product.setBid(userId, Integer.parseInt(bid));
                if (result) {
                    String[] userBids = user.getMyBids();
                    List userBiddings = Arrays.asList(userBids);
                    if (!userBiddings.contains(product.getProductId())) {
                        user.addBid(product.getProductId());
                    }
                    notify(product.getOwnerId(), id, "Your Item has a New Bidder", product.getName(), product.getImages()[0]);
                    System.out.println("1");
                    try {
                        notify(oldBidder, id, "You have been Outbidded", product.getName(), product.getImages()[0]);
                    } catch (Exception e) {
                        System.out.println("No Old Bidder");
                    }
                    System.out.println("2");
                    notify(product.getCurrBidId(), id, "You are the New Highest Bidder", product.getName(), product.getImages()[0]);
                    System.out.println("3");

                    usersRepo.save(user);
                    productsRepo.save(product);

                    if (Integer.parseInt(bid) == product.getMaxBid()){
                        closeBid(id);
                    }
                    return "Bid Placed Successfully";
                }
                return "Kindly place an appropriate bid";
            }
            return "You don't have enough balance";
        }
        return "You are the owner of the Item";
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/items/{id}/closebid")
    void closeBid(@PathVariable String id) {
        Products product = productsRepo.findProductById(id);

        String newOwner = product.getCurrBidId();
        String oldOwner = product.getOwnerId();
        Users newUser = usersRepo.findUserById(newOwner);
        Users oldUser = usersRepo.findUserById(oldOwner);

        ChatRooms chatRoom = null;

        List<ChatRooms> chatRooms = chatRoomsRepo.findAll();
        int alreadyExists = chatRooms.size();
        for (ChatRooms chatroom : chatRooms) {
            if (chatroom.getProductId().equals(id)) {
                if (chatroom.getSellerId().equals(oldOwner)) {
                    if (chatroom.getBuyerId().equals(newOwner)) {
                        alreadyExists = 1;
                        chatRoom = chatRoomsRepo.findChatRoomById(chatroom.getId());
                    }
                }
            }
        }

        if (chatRoom == null) {
            chatRoom = new ChatRooms(product.getName(), oldUser.getName(), newUser.getName(), id, oldOwner, newOwner, product.getImages()[0]);

            String[] oldUserChatRooms = oldUser.getMyRooms();
            List<String> oldUserChatRoomsList = new ArrayList<>(Arrays.asList(oldUserChatRooms));
            oldUserChatRoomsList.add(chatRoom.getId());
            oldUser.setMyRooms(oldUserChatRoomsList.toArray(new String[0]));

            String[] newUserChatRooms = newUser.getMyRooms();
            List<String> newUserChatRoomsList = new ArrayList<>(Arrays.asList(newUserChatRooms));
            newUserChatRoomsList.add(chatRoom.getId());
            newUser.setMyRooms(newUserChatRoomsList.toArray(new String[0]));

            usersRepo.save(oldUser);
            usersRepo.save(newUser);
        }

        String oldNameInfo = String.format("Name: %s", oldUser.getName());
        String newNameInfo = String.format("Name: %s", newUser.getName());

        Message messageOldName = new Message(oldOwner, oldNameInfo, System.currentTimeMillis() / 1000);
        Message messageNewName = new Message(newOwner, newNameInfo, System.currentTimeMillis() / 1000);

        // Email
        String oldEmailInfo = String.format("Email: %s", oldUser.getEmail());
        String newEmailInfo = String.format("Email: %s", newUser.getEmail());

        Message messageOldEmail = new Message(oldOwner, oldEmailInfo, System.currentTimeMillis() / 1000);
        Message messageNewEmail = new Message(newOwner, newEmailInfo, System.currentTimeMillis() / 1000);

        // Phone
        String oldPhoneInfo = String.format("Phone: %s", oldUser.getPhone());
        String newPhoneInfo = String.format("Phone: %s", newUser.getPhone());

        Message messageOldPhone = new Message(oldOwner, oldPhoneInfo, System.currentTimeMillis() / 1000);
        Message messageNewPhone = new Message(newOwner, newPhoneInfo, System.currentTimeMillis() / 1000);

        // Hostel
        String oldHostelInfo = String.format("Hostel: %s", oldUser.getHostel());
        String newHostelInfo = String.format("Hostel: %s", newUser.getHostel());

        Message messageOldHostel = new Message(oldOwner, oldHostelInfo, System.currentTimeMillis() / 1000);
        Message messageNewHostel = new Message(newOwner, newHostelInfo, System.currentTimeMillis() / 1000);

        Message[] messages = chatRoom.getMessages();
        List<Message> messagesList = new ArrayList<>(Arrays.asList(messages));

        messagesList.add(messageOldName);
        messagesList.add(messageOldEmail);
        messagesList.add(messageOldPhone);
        messagesList.add(messageOldHostel);
        messagesList.add(messageNewName);
        messagesList.add(messageNewEmail);
        messagesList.add(messageNewPhone);
        messagesList.add(messageNewHostel);

        chatRoom.setMessages(messagesList.toArray(new Message[0]));
        chatRoomsRepo.save(chatRoom);

        HashMap<String, Integer> allBidders = product.getAllBids();
        Set<String> allUsersId = allBidders.keySet();
        Iterator<String> iterator = allUsersId.iterator();

        while (iterator.hasNext()) {
            String userId = iterator.next();
            Users user = usersRepo.findUserById(userId);
            String[] userBids = user.getMyBids();
            List<String> userBiddings = new ArrayList<>(Arrays.asList(userBids));
            userBiddings.remove(product.getProductId());
            user.setMyBids(userBiddings.toArray(new String[0]));
            notify(userId, id, "The Item has been Sold", product.getName(), product.getImages()[0]);
            usersRepo.save(user);
        }

        // Notification Push
        notify(newOwner, id, "Congrat's you are the New Owner", product.getName(), product.getImages()[0]);
        notify(oldOwner, id, "Your Item has been Sold", product.getName(), product.getImages()[0]);

        newUser.setBalance(newUser.getBalance() - product.getCurrBidVal());
        oldUser.setBalance(oldUser.getBalance() + product.getCurrBidVal());

        String[] oldUserItems = oldUser.getMyItems();
        List<String> oldUserItemsList = new ArrayList<>(Arrays.asList(oldUserItems));
        oldUserItemsList.remove(product.getProductId());
        oldUser.setMyItems(oldUserItemsList.toArray(new String[0]));

        usersRepo.save(newUser);
        usersRepo.save(oldUser);

        product.setSold(true);
        productsRepo.save(product);

        return;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/newItem")
    String newItem(@RequestBody HashMap<String, String> body) {
        String userId = body.get("userId");
        long deadline = Long.parseLong(body.get("lastBidDate"));
        String[] images = { body.get("imageSrc1"), body.get("imageSrc2"), body.get("imageSrc3") };
        Products product = new Products(body.get("itemName"), body.get("desc"), images,
                deadline, body.get("usedTime"), Integer.parseInt(body.get("maxBid")),
                Integer.parseInt(body.get("minBid")), userId);

        productsRepo.save(product);

        Users user = usersRepo.findUserById(userId);
        String[] userItems = user.getMyItems();
        List<String> userItemsList = new ArrayList<>(Arrays.asList(userItems));
        userItemsList.add(product.getProductId());
        user.setMyItems(userItemsList.toArray(new String[0]));
        usersRepo.save(user);

        return product.getProductId();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/verify")
    String verify(@RequestBody HashMap<String, String> body) {

        Unirest.setTimeouts(0, 0);
        try {
            HttpResponse<String> response = Unirest.post("https://oauth2.googleapis.com/token")
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .field("code", body.get("key"))
                    .field("client_id", "693745589525-bjckfl34kha6igj4bed9ofa0t9qqbpdc.apps.googleusercontent.com")
                    .field("client_secret", "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")
                    .field("redirect_uri", "http://localhost:5173/callback")
                    .field("grant_type", "authorization_code")
                    .asString();

            JSONObject json = new JSONObject(response.getBody());
            String access_token = json.getString("access_token");

            Unirest.setTimeouts(0, 0);
            try {
                String url = "https://www.googleapis.com/oauth2/v1/userinfo/?access_token=" + access_token;
                HttpResponse<String> response2 = Unirest.get(url).asString();
                JSONObject json2 = new JSONObject(response2.getBody());
                String uuid = UUID.randomUUID().toString();
                List<Users> usersList = usersRepo.findAll();

                JSONObject retjson = new JSONObject();
                retjson.put("email", json2.getString("email"));
                retjson.put("name", json2.getString("name"));
                retjson.put("uuid", uuid);

                for (Users user : usersList) {
                    if (user.getEmail().equals(json2.getString("email"))) {
                        user.setSessionId(uuid);
                        usersRepo.save(user);
                        retjson.put("exists", true);
                        return retjson.toString();
                    }
                }

                retjson.put("exists", false);
                return retjson.toString();

            } catch (Exception e) {
                return "Error";
            }

        } catch (Exception e) {
            return "Error";
        }

    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    String register(@RequestBody HashMap<String, String> body) {
        String name = body.get("name");
        String email = body.get("email");
        String phone = body.get("phone");
        String hostel = body.get("hostel");
        String sessionId = body.get("sessionId");
        String userId = email.split("@")[0];

        Users user = new Users(userId, name, phone, email, hostel, sessionId);
        usersRepo.save(user);

        return "Success";
    }


    @MessageMapping("/room/{roomId}")
    @SendTo("/room/{roomId}")
    public Message message(@DestinationVariable String roomId, Message message) throws Exception {
        String content = message.getMessage();
        String userId = message.getUserId();
        long time = message.getTime();

        Message newMessage = new Message(userId, content, time);

        ChatRooms chatRoom = chatRoomsRepo.findChatRoomById(roomId);
        chatRoom.addMessage(newMessage);
        chatRoomsRepo.save(chatRoom);

        return newMessage;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/chatRoomExists")
    public String chatroomExists(@RequestBody HashMap<String, String> body) {
        List<ChatRooms> chatRooms = chatRoomsRepo.findAll();
        System.out.println("here");
        for (ChatRooms chatroom : chatRooms) {
            System.out.println("cndjcndjcndjcndjcn");
            if (chatroom.getProductId().equals(body.get("productId"))) {
                if (chatroom.getSellerId().equals(body.get("sellerId"))) {
                    if (chatroom.getBuyerId().equals(body.get("buyerId"))) {
                        return chatroom.getId();
                    }
                }
            }
        }
        System.out.println("cndjcndj");
        String sellerId = body.get("sellerId");
        String buyerId = body.get("buyerId");
        String buyerName = body.get("buyerName");
        String sellerName = body.get("sellerName");
        String productId = body.get("productId");

        Products product = productsRepo.findProductById(productId);

        String chatRoomName = product.getName() + " " + sellerName + " " + buyerName;
        String mainImage = product.getImages()[0];

        ChatRooms chatRoom = new ChatRooms(chatRoomName, sellerName, buyerName, productId, sellerId, buyerId, mainImage);
        chatRoomsRepo.save(chatRoom);

        Users seller = usersRepo.findUserById(sellerId);
        Users buyer = usersRepo.findUserById(buyerId);
        String[] sellerChatRooms = seller.getMyRooms();
        String[] buyerChatRooms = buyer.getMyRooms();
        List<String> sellerChatRoomsList = new ArrayList<>(Arrays.asList(sellerChatRooms));
        List<String> buyerChatRoomsList = new ArrayList<>(Arrays.asList(buyerChatRooms));
        sellerChatRoomsList.add(chatRoom.getId());
        buyerChatRoomsList.add(chatRoom.getId());
        seller.setMyRooms(sellerChatRoomsList.toArray(new String[0]));
        buyer.setMyRooms(buyerChatRoomsList.toArray(new String[0]));

        usersRepo.save(seller);
        usersRepo.save(buyer);

        return chatRoom.getId();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/chatRoom/{chatId}")
    public ChatRooms getMessages(@PathVariable String chatId) {
        ChatRooms chatRoom = chatRoomsRepo.findChatRoomById(chatId);
        return chatRoom;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/notifications")
    public Notif[] getNotifications(@RequestBody HashMap<String, String> body) {
        String userId = body.get("userId");
        Users user = usersRepo.findUserById(userId);
        Notif[] allNotif = user.getMyNotifs();
        return allNotif;
    }

    @CrossOrigin(origins = "http://192.168.21.23:8080")
    @PostMapping("/chatRoom")
    public Set<ChatRooms> getChatRooms(@RequestBody HashMap<String, String> body) {
        for (String key : body.keySet()) {
            System.out.println(key + " " + body.get(key));
        }
        String userId = body.get("userId");
        System.out.println(userId);
        Users user = usersRepo.findUserById(userId);

        String[] allRooms = user.getMyRooms();

        Set<ChatRooms> roomslist = new HashSet<>();

        for (String roomId : allRooms) {
            roomslist.add(chatRoomsRepo.findChatRoomById(roomId));
            System.out.println(roomId);
        }

        return roomslist;
    }

}
