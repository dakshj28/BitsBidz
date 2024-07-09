import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/css/account.css";
import bitscoins from '../assets/images/bitscoins.png';
import Navbar from "./navbar";
import Footer from "./footer";

export default function Root() {
  const [user, setUser] = useState(null);
  const [bal, setBal] = useState(0);
  const [phone, setPhone] = useState('');
  const [hostel, setHostel] = useState('');
  const [orgPhone, setOrgPhone] = useState('');
  const [orgHostel, setOrgHostel] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    try {
      var profile = JSON.parse(localStorage.getItem("profile"));
      //console.log(profile);
      fetch('http://localhost:8080/user-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: profile.userId,
        }),
      }).then((res) => res.json())
        .then((data) => {
          //console.log(data);
          setUser(data);
          setPhone(data.phone);
          setOrgPhone(data.phone);
          setHostel(data.hostel);
          setOrgHostel(data.hostel);
        });
    } catch (err) {
      navigate('/login');
    }
  }, []);

  const modifyBal = (value) => {
    //console.log('Click!');
    var newBal = bal + value;
    if (newBal < 0) {
      newBal = 0;
    }
    setBal(newBal);
    //console.log(bal);
  };

  const ordPlace = () => {
    if (bal === 0) {
      alert("Please add some BitsCoins to place an order");
      return;
    } else {
      alert(`Order Placed on SWD for ${bal} coins`);
      setBal(0);
    }
  };

  const handleChange = (event) => {
    setPhone(event.target.value);
    //console.log("cdncjd");
  };


  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleHostelChange = (event) => {
    setHostel(event.target.value);
  };

  const phoneChange = () => {
    try {
      var profile = JSON.parse(localStorage.getItem("profile"));
      if (phone.length !== 10) {
        alert("Please enter a valid phone number");
        window.location.reload(false);
        return;
      } else {
        if (phone === orgPhone) {
          window.location.reload(false);
          alert("Phone number not changed");
          return;
        } else {
          alert(`Phone number changed to ${phone}`);
          fetch('http://localhost:8080/user-account-update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phone: phone,
              hostel: hostel,
              userId: profile.userId,
            }),
          })
        }
      }
      window.location.reload(false);

    } catch (e) {
      navigate('/login');
    }
  };

  const hostelChange = () => {
    try {
      var profile = JSON.parse(localStorage.getItem("profile"));
      if (hostel.length === 0) {
        alert("Please enter a valid hostel name");
        window.location.reload(false);

        return;
      } else {
        if (hostel === orgHostel) {
          alert("Hostel name not changed");
          window.location.reload(false);

          return;
        } else {
          alert(`Hostel name changed to ${hostel}`);
          fetch('http://localhost:8080/user-account-update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phone: phone,
              hostel: hostel,
              userId: profile.userId,
            }),
          })
        }
      }
      window.location.reload(false);

    } catch (error) {
      navigate('/login');
    }
  }


  return (
    <>
      <Navbar />
      <div className="account-box">
        <div className="account-body">
          <div className="account-details">
            <div id="flex-container">
              <div className="account-flex-item-3">
                <div className="account-text-wrapper">Name:</div>
                <input
                  placeholder="Max 50 characters"
                  className="account-text-input-name"
                  value={user?.name}
                  disabled
                />
              </div>
              <div className="account-flex-item-3">
                <div className="account-text-wrapper">Email:</div>
                <input
                  placeholder="Max 50 characters"
                  className="account-text-input-name"
                  value={user?.email}
                  disabled
                />
              </div>
              <div className="account-flex-item-3">
                <div className="account-text-wrapper">Phone:</div>
                <div className="account-inline">
                  <input
                    type="number"
                    placeholder="Max 10 characters"
                    className="account-text-input-button-left"
                    onChange={handlePhoneChange}
                    value={phone}
                  />
                  <input
                    onClick={phoneChange}
                    type="submit"
                    className="account-text-input-button-right"
                    value="✅︎"
                  />
                </div>
              </div>
              <div className="account-flex-item-3">
                <div className="account-text-wrapper">Hostel</div>
                <div className="account-inline">
                  <input
                    placeholder="eg. VK-399"
                    className="account-text-input-button-left"
                    value={hostel}
                    onChange={handleHostelChange}
                    type="text"
                  />
                  <input
                    onClick={hostelChange}
                    type="submit"
                    className="account-text-input-button-right"
                    value="✅︎"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="account-balance">
            <div id="flex-container-left">
              <div className="account-flex-item-coins">
                <div className="account-text-wrapper">BitsCoin Balance</div>
                <br />
                <div className="account-coins" id="flex-container-left">
                  <img className="account-yes" src={bitscoins} alt="BitsCoins" />
                  <div className="account-text-wrapper-coins">{user?.balance}</div>
                </div>
              </div>
              <div className="account-flex-item-add-coins">
                <div className="account-text-wrapper">Add BitsCoins</div>
                <br />
                <div id="flex-container" className="account-coins">
                  <div className="account-flex-item-4">
                    <div className="account-coins" id="flex-container-left">
                      <img className="account-yes" src={bitscoins} alt="BitsCoins" />
                      <div className="account-text-wrapper-coins">{bal}</div>
                    </div>
                  </div>
                  <div className="account-flex-item-4">
                    <div className="account-counter">
                      <div id="flex-container-counter">
                        <div className="account-flex-item-2">
                          <div
                            onClick={() => modifyBal(50)}
                            role="button"
                            tabIndex="0"
                            className="account-text-wrapper-counter"
                          >
                            +
                          </div>
                        </div>
                        <div className="account-flex-item-2">
                          <div
                            onClick={() => modifyBal(-50)}
                            role="button"
                            tabIndex="0"
                            className="account-text-wrapper-counter"
                          >
                            -
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="account-flex-item-4">
                    <div className="account-counter">
                      <div
                        onClick={() => modifyBal(-bal)}
                        role="button"
                        tabIndex="0"
                        className="account-text-wrapper-count"
                      >
                        Reset
                      </div>
                    </div>
                  </div>
                  <div className="account-flex-item-4">
                    <div className="account-counter">
                      <div
                        onClick={ordPlace}
                        role="button"
                        tabIndex="0"
                        className="account-text-wrapper-count"
                      >
                        Place Order
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="account-description">
            <div className="account-title">
              BitsCoin balance will be deducted out of current SWD balance.
              <br></br>
              You will see the amount under BitsBidz section of deductions.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
