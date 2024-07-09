import React from "react";
import "../assets/css/home.css";
import bits from '../assets/images/BITSgreen.png';
import bidz from '../assets/images/BIDZ.png';
import daksh from '../assets/images/dj.png';
import github from '../assets/images/github.png';
import linkedin from '../assets/images/linkedin.png';
import subbu from '../assets/images/Subbu.png';
import granth from '../assets/images/Granth.png';
import hrishi from '../assets/images/hrishi.png';
import tagline from '../assets/images/tag.png';
import dice from '../assets/images/dice.png';

import Navbar from "./navbar";
import Footer from "./footer";

export default function Root() {
  return (
    <>
      <Navbar />
      {/* <Navbar id="nav-dummy"/> */}
      <div className="home-box">
        <div className="home-body">
          <div className="home-main">
            <div className="home-main-left">
              <img className="home-main-img" alt="Bits" src={bits} />
              <img className="home-main-img" alt="Bidz" src={bidz} />
              <img className="home-main-img" alt="Tagline" src={tagline} />
            </div>
            <div className="home-main-right">
              <img className="home-main-img" alt="Image" src={dice} />
            </div>
          </div>
          <br></br>
          <div className="home-main">
            <div className="home-main-card">
              <img className="home-main-card-img" alt="Profile" src={daksh} />
              <div className="home-main-name">Daksh Jain</div>
              <div className="home-main-socials">
                <center>
                  <a href="https://github.com/dakshj28" target="_blank">
                    <img className="home-main-socials-img" alt="Git hub" src={github} />
                  </a>
                  <a href="https://www.linkedin.com/in/daksh-jain-7b844b254/" target="_blank">
                    <img className="home-main-socials-img" alt="LinkedIn" src={linkedin} />
                  </a>
                </center>
              </div>
            </div>
            <div className="home-main-card">
              <img className="home-main-card-img" alt="Profile" src={granth} />
              <div className="home-main-name">Granth Bagadia</div>
              <div className="home-main-socials">
                <center>
                  <a href="https://github.com/granth23" target="_blank">
                    <img className="home-main-socials-img" alt="Git hub" src={github} />
                  </a>
                  <a href="https://www.linkedin.com/in/granth-bagadia-900b031b8/" target="_blank">
                    <img className="home-main-socials-img" alt="LinkedIn" src={linkedin} />
                  </a>
                </center>
              </div>
            </div>
            <div className="home-main-card">
              <img className="home-main-card-img" alt="Profile" src={subbu} />
              <div className="home-main-name">Sukhbodh Tripathi</div>
              <div className="home-main-socials">
                <center>
                  <a href="https://github.com/sukh3bodh" target="_blank">
                    <img className="home-main-socials-img" alt="Git hub" src={github} />
                  </a>
                  <a href="https://www.linkedin.com/in/sukhbodhanand-tripathi-56b331156/" target="_blank">
                    <img className="home-main-socials-img" alt="LinkedIn" src={linkedin} />
                  </a>
                </center>
              </div>
            </div>
            <div className="home-main-card">
              <img className="home-main-card-img" alt="Profile" src={hrishi} />
              <div className="home-main-name">Hrishikesh M K</div>
              <div className="home-main-socials">
                <center>
                  <a href="https://github.com/HrishikeshMK" target="_blank">
                    <img className="home-main-socials-img" alt="Git hub" src={github} />
                  </a>
                  <a href="https://www.linkedin.com/in/hrishikesh-m-k-b8b809258/" target="_blank">
                    <img className="home-main-socials-img" alt="Git LinkedIn" src={linkedin} />
                  </a>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}