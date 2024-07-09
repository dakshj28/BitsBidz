import React from "react";
import "../assets/css/footer.css"

import image20 from "../assets/images/image20.png";

export default function Root() {

  const goTochat = () => {
    try {
      var profile = JSON.parse(localStorage.getItem("profile"))
      if (profile.status === true) {
        window.location.href = `http://192.168.23.21:8080/?userid=${profile.userId}`;
      }
    } catch (e) {
      window.location.href = `http://localhost:5173/login`;
    }
  }

  return (
    <>
      <div className="footer-main">
        <div className="footer-top">
          <div className="footer-top-font">
          Contact us at bitsbidz@gmail.com
          </div>
        </div>
        <div className="footer-outer-chat" role="button" tabIndex='1' onClick={goTochat}>
          <div className="footer-chat">
            <img class="image" alt="Image" src={image20} />
          </div>
        </div>
      </div>
    </>
  );
}
