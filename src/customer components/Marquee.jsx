import React from "react";

//Importing Components
import LoggedInNav from "./LoggedInNav";

// Importing Images
import marqueeBg from "../images/Marquee BG.svg";

import backArrow from "../images/Back Arrow.svg";

// Importing other packages
import { Link } from "react-router-dom";
import one from "../images/1.jpg";
import two from "../images/1.jpeg";
import three from "../images/2.jpeg";
import four from "../images/3.jpeg";
import five from "../images/4.jpeg";
import six from "../images/5.jpeg";
import seven from "../images/6.jpeg";

const images = ["/static/media/1.jpg"];
const Marquee = () => {
  return (
    <>
      <LoggedInNav hideCart={{ display: "none" }} />
      <div className="marquee-section">
        <div className="marquee-title">
          <Link to="/book-halls">
            <img src={backArrow} alt="" width="35px" />
          </Link>
          <h1>Helix</h1>
          <p>Starting from 20,000 PKR</p>
        </div>
        <div className="marquee-details">
          <div className="location">
            <i className="fa fa-map-marker"></i>
            <p>Mumtazabad, Multan</p>
          </div>
          <div className="phone">
            <i className="fa fa-phone"></i>
            <p>021-9128192</p>
          </div>
          <div className="email">
            <i className="fa fa-envelope"></i>
            <p>helix@gmail.com</p>
          </div>
        </div>
        <div className="marquee-services">
          <h1>Services available</h1>
          <div className="marquee-services-cards">
            <div className="marquee-services-card">
              <i className="fa fa-check-square"></i>
              <p>Music System</p>
            </div>
            <div className="marquee-services-card">
              <i className="fa fa-check-square"></i>
              <p>Air Conditioning</p>
            </div>
            <div className="marquee-services-card">
              <i className="fa fa-check-square"></i>
              <p>Customize Decor</p>
            </div>
          </div>
        </div>
        <div className="marquee-gallery">
          <h1>Venue Gallery</h1>
          <div className="marquee-images">
            <img src={one} alt="" width="350px" />
            <img src={two} alt="" width="350px" />
            <img src={three} alt="" width="350px" />
            <img src={four} alt="" width="350px" />
            <img src={five} alt="" width="350px" />
            <img src={six} alt="" width="350px" />
            <img src={seven} alt="" width="350px" />
            <img src={marqueeBg} alt="" width="350px" />
          </div>
        </div>
        <div className="book-now-btn">
          {/* <Link to="/checkout"> */}
          <button className="button-style">Book Now</button> {/* </Link> */}
        </div>
      </div>
    </>
  );
};

export default Marquee;
