import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import '../assets/css/biddings.css';
import bitscoins from '../assets/images/bitscoins.png';

import Navbar from "./navbar";
import Footer from "./footer";

export default function Root() {
  const navigate = useNavigate();

  const [prods, setProds] = useState([]);

  const gotoitem = (id) => {
    navigate(`/items/${id}`);
  };

  useEffect(() => {
    try {
      var profile = JSON.parse(localStorage.getItem("profile"));
      fetch('http://localhost:8080/user/mybiddings', {
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
          // //console.log(data)
          let products = Object.values(data);
          setProds(products);
          var x = setInterval(function (products) {
            // //console.log(data)
            // //console.log(data.length)
            var profile = JSON.parse(localStorage.getItem("profile"));
            if (data[0] != null) {
              data.map((product, _) => {
                var boolId = `${product["productId"]}-bool`;
                var element = document.getElementById(boolId);
                //console.log(product["currBidId"], profile.userId)
                if (element) {
                  if (product["currBidId"] == profile.userId) {
                    element.innerHTML = "You are the highest bidder :)";
                  }
                  else {
                    element.innerHTML = "You have been outbidded :(";
                  }
                }
              })
            };
          }, 1000);
          x;
        });
    } catch (err) {
      navigate('/login');
    }

  }, []);


  return (
    <>
      <Navbar />
      <br></br>
      <div className="biddings-box">
        <div className="biddings-body">
          {prods && prods[0] != null && prods.map((product, index) => (
            <div key={index}>
              <div role='button' onClick={() => gotoitem(product?.productId)} tabIndex='0' className="biddings-comp biddings-flex-container">
                <img className="biddings-flex-item-image" alt="Image" src={product?.images[0]} />
                <div className="biddings-flex-item-details">
                  <p className="biddings-item-head">{product?.name}</p>
                  <br></br>
                  <div id="flex-container-props">
                    <div className="biddings-comp biddings-text-wrapper biddings-bruh">
                      <div className="biddings-flex-item-coinss biddings-coinsss">
                        <div className="biddings-text-wrapper-buy-now-text biddings-bruh" id={`${product?.productId}-bool`}></div>
                      </div>
                    </div>
                    <div className="biddings-comp biddings-text-wrapper">
                      <div className="biddings-flex-item-coinss biddings-coinsss">
                        <div className="biddings-text-wrapper-buy-now-text">Buy Out:</div>
                        <img className="biddings-coins-class" src={bitscoins} />
                        <div className="biddings-text-wrapper-buy-now-val">{product?.maxBid}</div>
                      </div>
                    </div>
                    <div className="biddings-comp biddings-text-wrapper">
                      <div className="biddings-flex-item-coinss biddings-coinsss">
                        <div className="biddings-text-wrapper-buy-now-text">Current Value:</div>
                        <img className="biddings-coins-class" src={bitscoins} />
                        <div className="biddings-text-wrapper-buy-now-val">{product?.currBidVal}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
            </div>
          ))}
          {prods && prods[0] == null && (
            <h1 className="biddings-head">No Bids Placed</h1>
          )}
          <br></br>
        </div>
      </div>
      <br></br>
      <Footer />
    </>
  );
}