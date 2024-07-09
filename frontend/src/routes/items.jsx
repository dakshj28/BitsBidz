import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import "../assets/css/items.css";
import bitscoins from '../assets/images/bitscoins.png';

import Navbar from "./navbar";
import Footer from "./footer";

export default function Root() {

    const [prods, setProds] = useState([]);
    const location = useLocation();

    const gotoitem = (value) => {
        window.location.href = `http://localhost:5173/items/${value}`;
    };

    var x = setInterval(function () { //Async Arrow Function
        if (prods.length > 0) {
            prods.map((product, _) => {
                var timeId = `${product["productId"]}-deadline`;
                var element = document.getElementById(timeId);
                if (element) {
                    element.innerHTML = "Time Left: " + setTime(product.deadline);
                    //console.log(product["productId"]);
                }
            });
        }
    }, 0);

    x;

    var setTime = (e) => {

        var date = new Date(e * 1000).getTime();
        var now = new Date().getTime();

        var distance = date - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / (1000));

        if (distance < 0) {
            return "EXPIRED";
        } else {
            return (days + "D " + hours + "H " + minutes + "M " + seconds + "S ");
        }
    };

    useEffect(() => {
        try {
            if (location.state && location.state.data) {
                setProds(location.state.data);
                //console.log(location.state.data)
                if (location.state.data.length === 0) {
                    document.getElementById("allItems").innerHTML = "<h1 class='items-head'>No Items Found</h1>"
                }
            } else {
                fetch('http://localhost:8080/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ search: "" }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        let products = Object.values(data);
                        //console.log(data);
                        setProds(products);
                        if (products.length === 0) {
                            document.getElementById("allItems").innerHTML = "<h1>No Items Found</h1>"
                        }
                    });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [location.state]);

    return (
        <>
            <Navbar />
            <br></br>
            <div className="items-box">
                <div id="allItems" className="items-body">
                    {prods.map((product, index) => (
                        <div key={index}>
                            <div role='button' onClick={() => gotoitem(product.productId)} tabIndex='0' className="items-comp items-flex-container">
                                <img className="items-flex-item-image" alt="Image" src={product?.images[0]} />
                                <div className="items-flex-item-details">
                                    <p className="items-item-head">{product.name}</p>
                                    <br></br>
                                    <div id="flex-container-props">
                                        <div className="items-comp items-text-wrapper">
                                            <div className="items-flex-item-coinss items-coinsss">
                                                <div className="items-text-wrapper-buy-now-text">Buy Now at:</div>
                                                <img className="items-coins-class" src={bitscoins} />
                                                <div className="items-text-wrapper-buy-now-val">{product.maxBid}</div>
                                            </div>
                                        </div>
                                        <div className="items-comp items-text-wrapper">
                                            <div className="items-flex-item-coinss items-coinsss">
                                                <div className="items-text-wrapper-buy-now-text">Current Bid Value:</div>
                                                <img className="items-coins-class" src={bitscoins} />
                                                <div className="items-text-wrapper-buy-now-val">{product.currBidVal}</div>
                                            </div>
                                        </div>
                                        <div className="items-comp items-text-wrapper bruh">
                                            <div className="items-flex-item-coinss items-coinsss">
                                                <div className="items-text-wrapper-buy-now-text items-bruh" id={`${product["productId"]}-deadline`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                        </div>
                    ))}
                    <br></br>
                </div>
            </div>
            <Footer />
        </>
    )
}