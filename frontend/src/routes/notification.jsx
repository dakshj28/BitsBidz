import React, { useState, useEffect } from 'react';
import "../assets/css/notification.css";

import { useNavigate } from "react-router-dom";

import image from "../assets/images/image40.png";
import Navbar from "./navbar"
import Footer from "./footer"

export default function Root() {
  const [notifs, setNotifs] = useState([]);

  const navigate = useNavigate();
  const goToitem = (productId) => {
    navigate(`/items/${productId}`);
  };

  useEffect(() => {
    try {
      var profile = JSON.parse(localStorage.getItem("profile"));
      if (profile === null) {
        navigate("/login");
      } else {
        fetch("http://localhost:8080/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: profile.userId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            setNotifs(data);
            if (data.length === 0) {
              document.getElementById("notifHead").innerHTML = "No Notifications"
              document.getElementById("allNotifBox").style.display = "none"
            }
          });
      }
    } catch (err) {
      // //console.log(err);
      navigate("/login");
    }
  }, []);

  function date(value) {
    var date = new Date(value * 1000).toISOString().slice(0, 19).replace('T', ' ');
    return date;
  }

  return (
    <>
      <Navbar />
      <div id="notif-main" className="notif-main">
        <h1 id="notifHead" className="notifs-head">Notifications</h1>
        <div id="allNotifBox" className="notif-box">
          {notifs && notifs.map((notif) => (
            <div className="notif-div" >
              <div className="notif-subdiv2">
                <p className="notif-heading">{notif.productName}</p>
                <p className="notif-time">{date(notif.time)}</p>
                <p className="notif-content"> {notif.message}</p>
              </div>
              <div className="notif-subdiv1">
                <div className="notif-button" >VIEW</div>
                <div role='button' onClick={() => goToitem(notif.productId)} tabIndex='0' className="notif-element-item-box" />
                <img className="notif-image1" alt="Image" src={notif.productImage} />
              </div>
            </div>
          ))
          }
        </div>
      </div>

      <Footer />
    </>


  );
}

