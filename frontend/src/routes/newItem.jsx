import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/newItem.css"
import add from '../assets/images/add.png';

import Navbar from "./navbar";
import Footer from "./footer";

export default function Root() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState(null);
  const [imageSrc1, setImageSrc1] = useState(null);
  const [imageSrc2, setImageSrc2] = useState(null);
  const [imageSrc3, setImageSrc3] = useState(null);
  const [minBid, setMinBid] = useState("");
  const [maxBid, setMaxBid] = useState("");
  const [usedTime, setUsedTime] = useState("");
  const [lastBidDate, setLastBidDate] = useState("");
  const [description, setDescription] = useState("");

  const uploadImage = (e, setImageSrc) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadItem = () => {
    try {
      var profile = JSON.parse(localStorage.getItem("profile"));
      let date = new Date(lastBidDate).getTime() / 1000;

      //console.log(imageSrc1);

      if (itemName === null || itemName === "") {
        alert("Please enter item name");
      } else if (imageSrc1 === null || imageSrc2 === null || imageSrc3 === null) {
        alert("Please upload all images");
      } else if (minBid === null || minBid === "") {
        alert("Please enter minimum bid");
      } else if (maxBid === null || maxBid === "") {
        alert("Please enter maximum bid");
      } else if (usedTime === null || usedTime === "") {
        alert("Please enter used time");
      } else if (lastBidDate === null || lastBidDate === "") {
        alert("Please enter last bid date");
      } else if (description === null || description === "") {
        alert("Please enter description");
      } else {

        fetch('http://localhost:8080/newItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemName: itemName,
            imageSrc1: imageSrc1,
            imageSrc2: imageSrc2,
            imageSrc3: imageSrc3,
            minBid: minBid,
            maxBid: maxBid,
            usedTime: usedTime,
            lastBidDate: date,
            desc: description,
            userId: profile.userId,
          }),
        }).then(resp => resp.text()).then(id => {
          //console.log(id);
          alert("Item uploaded successfully");
          window.location.href = `/items/${id}`;
        })

      }
    } catch (err) {
      navigate('/login');
    }
  }

  return (
    <>
      <Navbar />
      <div className="newItem-box">
        <div className="newItem-body">
          <div className="newItem-div">
            <div className="newItem-text-wrapper">Item Name:</div>
            <input placeholder="Max 50 characters" className="newItem-text-input-name" value={itemName}
              onChange={(e) => setItemName(e.target.value)}></input>
          </div>
          <div className="newItem-div">
            <div id="flex-container">
              <div className="newItem-flex-item-left">
                <div className="newItem-text-wrapper">Upload Images</div>
                <div id="flex-container-image">
                  <div className="newItem-flex-item-image">
                    {imageSrc1 && (
                      <div className="newItem-image-container">
                        <img src={imageSrc1} style={{
                          height: "290px",
                          width: "100%",
                          filter: "brightness(50%)"
                        }} alt="Uploaded" />
                      </div>
                    )}
                    <label className="newItem-custom-file-upload">
                      <input type="file" onChange={(e) => uploadImage(e, setImageSrc1)} accept="image/*" />
                      <img className="newItem-image" alt="Image" src={add} />
                    </label>
                  </div>
                  <div className="newItem-flex-item-image">
                    {imageSrc2 && (
                      <div className="newItem-image-container">
                        <img src={imageSrc2} style={{
                          height: "290px",
                          width: "100%",
                          filter: "brightness(50%)"
                        }} alt="Uploaded" />
                      </div>
                    )}
                    <label className="newItem-custom-file-upload">
                      <input type="file" onChange={(e) => uploadImage(e, setImageSrc2)} accept="image/*" />
                      <img className="newItem-image" alt="Image" src={add} />
                    </label>
                  </div>
                  <div className="newItem-flex-item-image">
                    {imageSrc3 && (
                      <div className="newItem-image-container">
                        <img src={imageSrc3} style={{
                          height: "290px",
                          width: "100%",
                          filter: "brightness(50%)"
                        }} alt="Uploaded" />
                      </div>
                    )}
                    <label className="newItem-custom-file-upload">
                      <input type="file" onChange={(e) => uploadImage(e, setImageSrc3)} accept="image/*" />
                      <img className="newItem-image" alt="Image" src={add} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="newItem-flex-item-right">
                <div id="flex-container">
                  <div className="newItem-flex-item-price"><div className="newItem-div">
                    <div className="newItem-text-wrapper">Minimum Bid:</div>
                    <input type="number" className="newItem-text-input-name" value={minBid}
                      onChange={(e) => setMinBid(e.target.value)}></input>
                  </div>
                  </div>
                  <div className="newItem-flex-item-price"><div className="newItem-div">
                    <div className="newItem-text-wrapper">Maximum Bid:</div>
                    <input type="number" className="newItem-text-input-name" value={maxBid}
                      onChange={(e) => setMaxBid(e.target.value)}></input>
                  </div>
                  </div>
                </div>
                <br></br>
                <div className="newItem-div">
                  <div className="newItem-text-wrapper">Used Months:</div>
                  <input type="number" className="newItem-text-input-name" value={usedTime}
                    onChange={(e) => setUsedTime(e.target.value)}></input>
                </div>
                <div className="newItem-">
                  <div className="newItem-text-wrapper">Last Bid Date:</div>
                  <input placeholder="Max 50 characters" type="date" className="newItem-text-input-name" value={lastBidDate}
                    onChange={(e) => setLastBidDate(e.target.value)}></input>
                </div>
              </div>
            </div>
          </div>
          <div className="newItem-div">
            <div className="newItem-text-wrapper">Description:</div>
            <textarea name="comment" className="newItem-text-input-desc" placeholder="Max 1000 Characters" value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="register-flex-item-3">
            <div className="register-flex-submit">
              <div className="register-submit">
                <div role="button" tabIndex="0" onClick={uploadItem} className="register-submit-text-wrapper">Submit</div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
}
