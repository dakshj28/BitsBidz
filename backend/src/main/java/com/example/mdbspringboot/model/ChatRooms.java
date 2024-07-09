package com.example.mdbspringboot.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.ObjectId;
import com.example.mdbspringboot.model.Message;

@Document("chatrooms")
public class ChatRooms {
    private String id;
    private String chatRoomName;
    private String sellerName;
    private String buyerName;
    private String productId;
    private String sellerId;
    private String buyerId;
    private Message[] messages;
    private String mainImage;

    public ChatRooms(String chatRoomName, String sellerName, String buyerName, String productId, String sellerId, String buyerId, String mainImage) {
        this.id = new ObjectId().toString();
        this.chatRoomName = chatRoomName;
        this.sellerName = sellerName;
        this.buyerName = buyerName;
        this.productId = productId;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.messages = new Message[]{};
        this.mainImage = mainImage;
    }

    public String getId() {
        return this.id;
    }

    public String getChatRoomName() {
        return this.chatRoomName;
    }

    public String getSellerName() {
        return this.sellerName;
    }

    public String getBuyerName() {
        return this.buyerName;
    }

    public String getProductId() {
        return this.productId;
    }

    public String getSellerId() {
        return this.sellerId;
    }

    public String getBuyerId() {
        return this.buyerId;
    }

    public Message[] getMessages() {
        return this.messages;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setChatRoomName(String chatRoomName) {
        this.chatRoomName = chatRoomName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }

    public void setMessages(Message[] messages) {
        this.messages = messages;
    }

    public void addMessage(Message message) {
        Message[] newMessages = new Message[this.messages.length + 1];
        for (int i = 0; i < this.messages.length; i++) {
            newMessages[i] = this.messages[i];
        }
        newMessages[this.messages.length] = message;
        this.messages = newMessages;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public String getMainImage() {
        return this.mainImage;
    }

}
