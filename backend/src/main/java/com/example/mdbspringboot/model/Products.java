package com.example.mdbspringboot.model;

import org.bson.types.ObjectId;

import java.util.HashMap;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("products")
public class Products {
    @Id
    private String productId;
    private String name;
    private String desc;
    private String[] images;
    private long deadline;
    private String usedTime;
    private int maxBid;
    private int minBid;
    private String ownerId;
    private String currBidId;
    private int currBidVal;
    private HashMap<String, Integer> allBids;
    private Boolean sold;

    public Products(String name, String desc, String[] images, long deadline, String usedTime, int maxBid, int minBid, String ownerId) {

        this.productId = new ObjectId().toString();
        this.name = name;
        this.desc = desc;
        this.images = images;
        this.deadline = deadline;
        this.usedTime = usedTime;
        this.maxBid = maxBid;
        this.minBid = minBid;
        this.ownerId = ownerId;
        this.currBidId = "";
        this.currBidVal = 0;
        this.allBids = new HashMap<String, Integer>();
        this.sold = false;

    }

    public String getProductId() {
        return this.productId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return this.desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public void setImages(String[] images) {
        this.images = images;
    }

    public String[] getImages() {
        return this.images;
    }

    public long getDeadline() {
        return this.deadline;
    }

    public void setDeadline(long deadline) {
        this.deadline = deadline;
    }

    public void setUsedTime(String usedTime) {
        this.usedTime = usedTime;
    }

    public String getUsedTime() {
        return this.usedTime;
    }

    public int getMaxBid() {
        return this.maxBid;
    }

    public void setMaxBid(int maxBid) {
        this.maxBid = maxBid;
    }

    public int getMinBid() {
        return this.minBid;
    }

    public void setMinBid(int minBid) {
        this.minBid = minBid;
    }

    public String getOwnerId() {
        return this.ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getCurrBidId() {
        return this.currBidId;
    }

    public void setCurrBidId(String currBidId) {
        this.currBidId = currBidId;
    }

    public int getCurrBidVal() {
        return this.currBidVal;
    }

    public void setCurrBidVal(int currBidVal) {
        this.currBidVal = currBidVal;
    }

    public Boolean getSold() {
        return this.sold;
    }

    public void setSold(Boolean sold) {
        this.sold = sold;
    }

    public HashMap<String, Integer> getAllBids() {
        return this.allBids;
    }

    public void setAllBids(HashMap<String, Integer> allBids) {
        this.allBids = allBids;
    }

    public Boolean setBid(String bidId, int bidVal){
        if (bidVal > this.maxBid || bidVal < this.minBid){
            return false;
        }
        else if (this.currBidId.equals(bidId)){
            return false;
        }
        else{
            this.allBids.put(bidId, bidVal);
            this.currBidId = bidId;
            this.currBidVal = bidVal;
            return true;
        }
    }
}
