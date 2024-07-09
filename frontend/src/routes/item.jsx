import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/item.css";
import bitscoins from "../assets/images/bitscoins.png";
import chaticon from "../assets/images/chaticon.png";

import Navbar from "./navbar";
import Footer from "./footer";

export default function Root() {
  let { id } = useParams();
  const navigate = useNavigate();

  var [product, setProd] = useState(null);
  var [date, setDate] = useState(null);
  var [currBidVal, setCurrBidVal] = useState(0);
  var [orgBidVal, setOrgBidVal] = useState(0);
  var [currImage, setCurrImage] = useState(null);

  const animalColorCombinations = [
    "BlackPanther",
    "RedFox",
    "BlueJay",
    "GreenTurtle",
    "YellowTiger",
    "BrownBear",
    "PinkFlamingo",
    "WhiteSwan",
    "GrayElephant",
    "OrangeGiraffe",
    "PurpleParrot",
    "GoldfishOrange",
    "SilverShark",
    "VioletButterfly",
    "MaroonGorilla",
    "CyanPeacock",
    "IndigoChameleon",
    "MagentaJellyfish",
    "TanKangaroo",
    "AquaPenguin",
    "LavenderLion",
    "OliveOstrich",
    "CrimsonCheetah",
    "CoralCrab",
    "RubyRaccoon",
    "TurquoiseToucan",
    "BeigeBison",
    "SalmonSnake",
    "EbonyEagle",
    "ApricotAntelope",
    "TealTortoise",
    "BrassBat",
    "CinnamonCheetah",
    "CyanCoyote",
    "BurgundyBee",
    "CeruleanCamel",
    "BronzeBaboon",
    "AmethystArmadillo",
    "EbonyEchidna",
    "PeriwinklePuma",
    "CharcoalChinchilla",
    "MustardMongoose",
    "TopazTarantula",
    "BrassBobcat",
    "SaffronSeahorse",
    "BisqueBadger",
    "MintMantis",
    "MahoganyMouse",
    "TawnyTurtle",
    "VermilionVulture",
    "MauveMole",
    "PersimmonPangolin",
    "EmeraldEft",
    "PeachPuffin",
    "CeriseCormorant",
    "AshAardvark",
    "CoralCaterpillar",
    "PlatinumPlatypus",
    "IvoryIguana",
    "AlabasterAxolotl",
    "BrassBulldog",
    "CeruleanCougar",
    "CyanCuttlefish",
    "SableStingray",
    "SalmonSparrow",
    "BurgundyBulbul",
    "UmberUguisu",
    "GarnetGazelle",
    "DenimDragonfly",
    "CitronCricket",
    "CeladonChipmunk",
    "AzureAnt",
    "FlaxFerret",
    "RubyRat",
    "LapisLynx",
    "GoldfinchGoldfish",
    "CobaltCoati",
    "SiennaSloth",
    "LavenderLiger",
    "PewterPelican",
    "BlushBison",
    "SepiaSparrowhawk",
    "CelosiaCheetah",
    "CoralCatfish",
    "CobaltCaribou",
    "MarigoldMarmoset",
    "PlatinumPorcupine",
    "AuburnArmadillo",
    "FernFrog",
    "TerracottaTiger",
    "ViridianViper",
    "GingerGazelle",
    "AlabasterAardwolf",
    "EbonyElk",
    "CobaltCat",
    "CrimsonCockatoo",
    "TangerineTigerfish",
    "AquaAkita",
    "OrchidOcelot",
    "GoldenGiraffe",
  ];

  // Function to fetch a random name from the array
  function getRandomName() {
    const randomIndex = Math.floor(
      Math.random() * animalColorCombinations.length
    );
    return animalColorCombinations[randomIndex];
  }

  function chatroom() {
    try {
      var profile = JSON.parse(localStorage.getItem("profile"));

      var productId = id;
      var sellerId = product.ownerId;
      var buyerId = profile.userId;
      var sellerName = getRandomName();
      var buyerName = getRandomName();

      const chatRoom = {
        sellerId: sellerId,
        buyerId: buyerId,
        buyerName: buyerName,
        sellerName: sellerName,
        productId: productId,
      };

      fetch(`http://localhost:8080/chatRoomExists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatRoom),
      })
        .then((resp) => resp.text())
        .then((text) => {
          //console.log(text);
          window.location.href = `http://localhost:8080/?roomid=${text}&userid=${buyerId}`;
          // navigate
        });
    } catch (e) {
      //console.log(e);
      navigate("/login");
    }
  }

  const modifyBal = (value) => {
    if (value == 0) {
      setCurrBidVal(orgBidVal);
      return;
    }
    var newBidVal = currBidVal + value;
    if (newBidVal <= orgBidVal) {
      newBidVal = currBidVal;
    } else if (newBidVal >= product.maxBid) {
      newBidVal = currBidVal
    }
    setCurrBidVal(newBidVal);
  };

  const placeBid = (value) => {
    //console.log(value);
    // Post request
    try {
      var profile = JSON.parse(localStorage.getItem("profile"));
      if (currBidVal == product.maxBid) {
      } else {
        if (currBidVal !== product.currBidVal) {
          fetch(`http://localhost:8080/items/${id}/newbid`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bid: currBidVal,
              userId: profile.userId,
            }),
          })
            .then((resp) => resp.text())
            .then((text) => {
              alert(text);
              //console.log(text);
              navigate(`/items/${id}`);
            });
        } else {
          alert("Place a higher Bid")
        }
      }
    } catch (e) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/items/${id}`, {})
      .then((res) => res.json())
      .then((data) => {
        try {
          if (data.sold == true) {
            navigate(`/`);
          }
          var profile = JSON.parse(localStorage.getItem("profile"));
          var email = profile.email;
          if (data.sold == false && profile.userId == data.ownerId) {
            navigate(`/items/${id}/edit`)
          }
        } catch (e) {
        }
        setProd(data);
        var endDate = new Date(data.deadline * 1000).getTime();
        setDate(endDate);
        var exp = data.currBidVal < data.minBid ? data.minBid : data.currBidVal + 50
        setCurrBidVal(exp);
        setOrgBidVal(data.currBidVal);
        setCurrImage(data.images[0]);
        //console.log(data);
      })
  }, []);

  var x = setInterval(function () {
    var now = new Date().getTime();

    var distance = date - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
      days + "D " + hours + "H " + minutes + "M " + seconds + "S ";
    //console.log(date);
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "EXPIRED";
    }
  }, 1000);

  return (
    <>
      <Navbar />
      <br></br>
      <div className="item-box">
        <div className="item-body">
          <div className="item-product item-flex-container">
            <div className="item-flex-item-side-images">
              <div
                role="button"
                tabIndex="0"
                className="item-image-button"
                onClick={() => setCurrImage(product?.images[0])}
              >
                <img
                  className="item-sideimg"
                  alt="Image"
                  src={product?.images[0]}
                />
              </div>
              <div
                role="button"
                tabIndex="0"
                className="item-image-button"
                onClick={() => setCurrImage(product?.images[1])}
              >
                <img
                  className="item-sideimg"
                  alt="Image"
                  src={product?.images[1]}
                />
              </div>
              <div
                role="button"
                tabIndex="0"
                className="item-image-button"
                onClick={() => setCurrImage(product?.images[2])}
              >
                <img
                  className="item-sideimg"
                  alt="Image"
                  src={product?.images[2]}
                />
              </div>
            </div>
            <div className="item-flex-item-main-images">
              <img className="item-mainimg" alt="Image" src={currImage} />
            </div>
            <div className="item-flex-item-attributes">
              <img
                src={chaticon}
                role="button"
                tabIndex="0"
                onClick={chatroom}
                alt="chatwb"
                className="item-chatwb"
              />
              <p className="item-item-head">{product?.name}</p>
              <div id="flex-container-props" className="item-coins">
                <div className="item-flex-item-coinss item-coinsss">
                  <img className="item-coins-class" src={bitscoins} />
                  <div className="item-text-wrapper-buy-now-val">
                    {currBidVal < product?.minBid ? product?.minBid : currBidVal}
                  </div>
                </div>
                <div className="item-flex-item-4">
                  <div className="item-counter1">
                    <div id="flex-container-counter">
                      <div className="item-flex-item-2">
                        <div
                          onClick={() => modifyBal(50)}
                          role="button"
                          tabIndex="0"
                          className="item-text-wrapper-counter"
                        >
                          +
                        </div>
                      </div>
                      <div className="item-flex-item-2">
                        <div
                          onClick={() => modifyBal(-50)}
                          role="button"
                          tabIndex="0"
                          className="item-text-wrapper-counter"
                        >
                          -
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-flex-item-4">
                  <div className="item-counter1">
                    <div
                      onClick={() => modifyBal(0)}
                      role="button"
                      tabIndex="0"
                      className="item-text-wrapper-count"
                    >
                      Reset
                    </div>
                  </div>
                </div>
                <div className="item-flex-item-4">
                  <div className="item-counter1">
                    <div
                      onClick={() => placeBid(currBidVal)}
                      role="button"
                      tabIndex="0"
                      className="item-text-wrapper-count"
                    >
                      Place Bid
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-counter">
                <div
                  onClick={() => placeBid(product?.maxBid)}
                  role="button"
                  tabIndex="0"
                  id="flex-container-counter"
                  className="item-button-cursor"
                >
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">Buy Now</div>
                  </div>
                  <div className="item-flex-item-2 item-coinsss">
                    <img className="item-coins-class" src={bitscoins} />
                    <div className="item-text-wrapper-buy-now-val">
                      {product?.maxBid}
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-counter">
                <div id="flex-container-counter">
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">
                      Time Remaining
                    </div>
                  </div>
                  <div className="item-flex-item-2">
                    <div
                      className="item-text-wrapper-buy-now"
                      id="countdown"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="item-counter">
                <div id="flex-container-counter">
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">Purchased</div>
                  </div>
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">
                      {product?.usedTime} month(s) ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-counter">
                <div id="flex-container-counter">
                  <div className="item-flex-item-2">
                    <div className="item-text-wrapper-buy-now">
                      Starting Bid
                    </div>
                  </div>
                  <div className="item-flex-item-2 item-coinsss">
                    <img className="item-coins-class" src={bitscoins} />
                    <div className="item-text-wrapper-buy-now-val">
                      {product?.minBid}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>

          <div className="item-description">
            <div className="item-title">DESCRIPTION:</div>
            <p className="item-text-wrapper">{product?.desc}</p>
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </>
  );
}
