import React from "react";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import "../assets/css/item.css"
import bitscoins from '../assets/images/bitscoins.png';
import Navbar from "./navbar"
import Footer from "./footer"
export default function Root() {

  let { id } = useParams();

  var [product, setProd] = useState(null);
  var [date, setDate] = useState(null);

  const refresh = () => {
    fetch(`http://localhost:8080/items/${id}`, {
    })
      .then((res) => res.json())
      .then((data) => {
        setProd(data);
        var endDate = new Date((data.deadline) * 1000).getTime();
        setDate(endDate);
        //console.log(data)
      });
  }
  useEffect(() => {
    refresh();
  }, []);

  const closeBid = (value) => {
    //console.log(value);
    // Post request
    fetch(`http://localhost:8080/items/${id}/closebid`, {
      method: 'GET',
    }).then(resp => resp.text()).then(text => {
      window.location.href = `http://localhost:8080/`;
    })
  }

  var x = setInterval(function () {

    var now = new Date().getTime();

    var distance = date - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / (1000));

    document.getElementById("countdown").innerHTML = days + "D " + hours + "H " + minutes + "M " + seconds + "S ";
    //console.log(date)
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }, 1000);

  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <div className="item-box">
        <div className="item-body">
          <div className="item-product item-flex-container">
            <div className="item-flex-item-side-images">
              <img className="item-sideimg" alt="Image" src={product?.images[0]} />
              <img className="item-sideimg" alt="Image" src={product?.images[1]} />
              <img className="item-sideimg" alt="Image" src={product?.images[2]} />
            </div>
            <div className="item-flex-item-main-images">
              <img className="item-mainimg" alt="Image" src={product?.images[0]} />
            </div>
            <div className="item-flex-item-attributes">
              <br></br>
              <p className="item-item-head">{product?.name}</p>
              <div className="item-counter">
                <div onClick={() => closeBid()} role='button' tabIndex='0' id="flex-container-counter" className="item-button-cursor">
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">Sell Now</div>
                  </div>
                  <div className="item-flex-item-2 item-coinsss">
                    <img className="item-coins-class" src={bitscoins} />
                    <div className="item-text-wrapper-buy-now-val">{product?.currBidVal}</div>
                  </div>
                </div>
              </div>
              <div className="item-counter">
                <div onClick={() => placeBid(product?.currBidVal)} role='button' tabIndex='0' id="flex-container-counter" className="item-button-cursor">
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">SellOut Price</div>
                  </div>
                  <div className="item-flex-item-2 item-coinsss">
                    <img className="item-coins-class" src={bitscoins} />
                    <div className="item-text-wrapper-buy-now-val">{product?.maxBid}</div>
                  </div>
                </div>
              </div>
              <div className="item-counter">
                <div id="flex-container-counter">
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">Time Remaining</div>
                  </div>
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now" id="countdown"></div>
                  </div>
                </div>
              </div>
              <div className="item-counter">
                <div id="flex-container-counter">
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">Purchased</div>
                  </div>
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">{product?.usedTime} month(s) ago</div>
                  </div>
                </div>
              </div>
              <div className="item-counter">
                <div id="flex-container-counter">
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">Starting Bid</div>
                  </div>
                  <div className="item-flex-item-2 item-coinsss">
                    <img className="item-coins-class" src={bitscoins} />
                    <div className="item-text-wrapper-buy-now-val">{product?.minBid}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>

          <div className="item-description">
            <div className="item-title">DESCRIPTION:</div>
            <p className="item-text-wrapper">
              {product?.desc}
            </p>
          </div>
          <br></br>
          <br></br>
        </div >
      </div >
      <Footer />
    </>
  );
}