import React from "react";
import "../assets/css/navbar.css"
import { useNavigate } from "react-router-dom";

import image18 from "../assets/images/image18.png";
import image19 from "../assets/images/image19.png";
import Navlogo from "../assets/images/Navlogo.png";
import search from "../assets/images/search.png";

export default function Root() {
  const navigate = useNavigate();
  const goHome = () => {
    window.location.href = `http://localhost:5173/home/`;
  };
  const goToItems = () => {
    window.location.href = `http://localhost:5173/listings/`;
  };
  const goTonotif = () => {
    window.location.href = `http://localhost:5173/notification/`;
  };
  const goToaccount = () => {
    window.location.href = `http://localhost:5173/account/`;
  };
  const signOut = () => {
    window.location.href = `http://localhost:5173/logout/`;
  };
  const signIn = () => {
    window.location.href = `http://localhost:5173/login/`;
  };
  const goTomyBids = () => {
    window.location.href = `http://localhost:5173/biddings/`;
  };
  const goTonewItem = () => {
    window.location.href = `http://localhost:5173/newItem/`;
  };
  const goTochat = () => {
    window.location.href = `http://localhost:5173/chat`;
  }

  const searchItems = () => {
    const search = document.getElementsByClassName("navbar-search")[0].value;
    //console.log(search);
    fetch('http://localhost:8080/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: search }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        navigate('/items', { state: { data: data } });
      });
    // window.location.href = `http://localhost:5173/search/${search}`;
  }

  if (localStorage.getItem("profile") === null || localStorage.getItem("profile") === undefined) {
    return (
      <>
        <div className="navbar-main">
          <div className="navbar-layout">
            <div className="navbar-logo" role="button" tabIndex='1' onClick={goHome}>
              <img className="navbar-image" alt="Image" src={Navlogo} />
            </div>
            <div className="navbar-outer-search">
              <input className="navbar-search" type="text" placeholder="Search for items..." />
              <img role="button" tabIndex="0" className="navbar-search-image" onClick={searchItems} alt="Image" src={search} />
            </div>
            <div className="navbar-flexbox">
              <div className="navbar-outer-signout" role="button" tabIndex='1' onClick={signIn}>
                <div className="navbar-signout" >SIGN IN</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="navbar-main">
        <div className="navbar-layout">
          <div className="navbar-logo" role="button" tabIndex='1' onClick={goHome}>
            <img className="navbar-image" alt="Image" src={Navlogo} />
          </div>
          <div className="navbar-outer-search">
            <input className="navbar-search" type="text" placeholder="Search for items..." />
            <img role="button" tabIndex="0" className="navbar-search-image" onClick={searchItems} alt="Image" src={search} />
          </div>
          <div className="navbar-flexbox">
            <div className="navbar-outer-bubble" role="button" tabIndex='1' onClick={goToaccount}>
              <div className="navbar-bubble">
                <img class="image" alt="Image" src={image18} height="30" width="30" align="center" />
              </div></div>
            <div className="navbar-outer-bubble" role="button" tabIndex='1' onClick={goTonotif}>
              <div className="navbar-bubble">
                <img class="image" alt="Image" src={image19} />
              </div></div>
            <div className="navbar-outer-signout" role="button" tabIndex='1' onClick={signOut}>
              <div className="navbar-signout" >SIGN OUT</div>
            </div>
          </div>
        </div>
        <div className="navbar-layout-2">
          <div className="navbar-textbox" role="button" tabIndex='1' onClick={goTonewItem}>NEW ITEM</div>
          <div className="navbar-textbox" role="button" tabIndex='1' onClick={goToItems}>MY ITEMS</div>
          <div className="navbar-textbox" role="button" tabIndex='1' onClick={goTomyBids}>MY BIDS</div>
        </div>
      </div>
    </>
  );
}
