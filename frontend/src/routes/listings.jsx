import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from "./navbar";
import Footer from "./footer";

import '../assets/css/listings.css';
import bitscoins from '../assets/images/bitscoins.png';
import image4 from '../assets/images/image38.png';

export default function Root() {
  const [prods, setProds] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const gotoitem = (id) => {
    navigate(`/items/${id}`);
  };

  var x = setInterval(function () { //Async Arrow Function
    if (prods.length > 0) {
      prods.map((product, _) => {
        var timeId = `${product?.productId}-deadline`;
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
      var profile = JSON.parse(localStorage.getItem("profile"));
      fetch('http://localhost:8080/user/mylistings', {
        'method': 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: profile.userId
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          let products = Object.values(data);
          //console.log(data)
          setProds(products);
        });
    } catch (err) {
      navigate('/login');
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <div className="listings-box">
        <div className="listings-body">
          {prods && prods[0] != null && prods.map((product, index) => (
            <div key={index}>
              <div role='button' onClick={() => gotoitem(product?.productId)} tabIndex='0' className="listings-comp listings-flex-container">
                <img className="listings-flex-item-image" alt="Image" src={product?.images[0]} />
                <div className="listings-flex-item-details">
                  <p className="listings-item-head">{product?.name}</p>
                  <br></br>
                  <div id="flex-container-props">
                    <div className="listings-comp text-wrapper listings-bruh">
                      <div className="listings-flex-item-coinss listings-coinsss">
                        <div className="listings-text-wrapper-buy-now-text listings-bruh" id={`${product?.productId}-deadline`}></div>
                      </div>
                    </div>
                    <div className="listings-comp listings-text-wrapper">
                      <div className="listings-flex-item-coinss listings-coinsss">
                        <div className="listings-text-wrapper-buy-now-text">Buy Out:</div>
                        <img className="listings-coins-class" src={bitscoins} />
                        <div className="listings-text-wrapper-buy-now-val">{product?.maxBid}</div>
                      </div>
                    </div>
                    <div className="listings-comp listings-text-wrapper">
                      <div className="listings-flex-item-coinss listings-coinsss">
                        <div className="listings-text-wrapper-buy-now-text">Current Value:</div>
                        <img className="listings-coins-class" src={bitscoins} />
                        <div className="listings-text-wrapper-buy-now-val">{product?.currBidVal}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
            </div>
          ))}
          {prods && prods[0] == null && (
            <h1 className="biddings-head">No Items you Own</h1>
          )}
          <br></br>
        </div>
      </div>
            <Footer />
    </>
  );
}