package com.example.mdbspringboot.model;

public class Notif {
    private String message;
    private String productId;
    private long time;
    private String productName;
    private String productImage;

    public Notif(String message, String productId, long time, String productName, String productImage) {
        this.message = message;
        this.productId = productId;
        this.time = time;
        this.productName = productName;
        this.productImage = productImage;
    }

    public String getMessage() {
        return message;
    }

    public String getProductId() {
        return productId;
    }

    public long getTime() {
        return time;
    }

    public String getProductName() {
        return productName;
    }

    public String getProductImage() {
        return productImage;
    }
}