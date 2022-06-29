import React, { useState, useEffect } from "react";

// Importing Components
import Nav from "./Nav";
import LoggedInNav from "./LoggedInNav";
import Cart from "./Cart";

// Importing Images
import homeImage from "../images/Home.svg";
import beeBackdrop from "../images/Bee Backdrop.svg";
import hiveBackdrop from "../images/Hive Backdrop.svg";
import separator from "../images/How it works title.svg";
import takeawayCardImage from "../images/Takeaway.svg";
import reserveCardImage from "../images/Reserve Table.svg";
import bookCardImage from "../images/Book Hall.svg";

// Importing Other Packages
import { Link } from "react-router-dom";
import axios from "axios";
import SimpleChatBot from "./SimpleChatBot";
import { FoodBg } from "./BackgroundImage";

const Home = ({ adminCheck }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userrole, setUserrole] = useState("");
  function checkLoggedIn() {
    if (localStorage.getItem("token") && localStorage.getItem("userrole")) {
      setLoggedIn(true);
    }
  }

  const showCart = () => {
    var element = document.getElementById("cart");
    element.classList.remove("cart-hide");
    element.classList.add("cart");
  };

  useEffect(() => {
    checkLoggedIn();
    setUserrole(localStorage.getItem("userrole"));
    if (!localStorage.getItem("userrole")) {
      window.location.href = "/newsignup";
    }
  }, []);

  if (userrole === "customer") {
    return (
      <>
        {loggedIn == true && <LoggedInNav showCart={showCart} linkTo="/" />}
        {loggedIn == false && <Nav />}
        <FoodBg />
        <div className="home-section">
          <div className="home-left-section">
            <h1>
              Welcome to <br /> BeeExpress
            </h1>
            <p>
              Want to order food for takeaway <br /> or book a marquee/hall?
              Then
              <br /> BeeExpress!
            </p>
            <Link to="/option">
              <button className="button-style">Get Started</button>
            </Link>
          </div>
          <div className="home-right-section">
            <img src={homeImage} alt="" width="500px" />
          </div>
        </div>
        <div className="how-it-works">
          <img
            src={beeBackdrop}
            alt=""
            className="bee-backdrop"
            width="400px"
          />
          <div className="how-it-works-title">
            <h1>How it works</h1>
            <img src={separator} alt="" width="150px" />
          </div>
          <div className="how-it-works-cards">
            <div className="custom-card">
              <img src={takeawayCardImage} alt="" width="300px" />
              <h1>Takeaway</h1>
              <p>
                Tired of waiting an hour for your takeaway? <br /> Well not
                anymore, just place the order <br /> through this website and
                pick it on the way
              </p>
              <Link to="/food-order" style={{ textDecoration: "none" }}>
                <button className="button-style card-button">Start Now</button>
              </Link>
            </div>
            <div className="custom-card">
              <img src={reserveCardImage} alt="" width="300px" />
              <h1>Reserve a table</h1>
              <p>
                Reserve a table of your favourite restaurant <br /> from here so
                you don't have to worry <br /> about it later
              </p>
              <Link to="/food-order" style={{ textDecoration: "none" }}>
                <button className="button-style card-button ">Start Now</button>
              </Link>
            </div>
            <div className="custom-card">
              <img src={bookCardImage} alt="" width="300px" />
              <h1>Book a hall</h1>
              <p>
                Looking for a marquee/hall to celebrate an <br /> event? Find
                best marquee/halls in your city <br /> at reasonable rates
              </p>
              <Link to="/book-halls" style={{ textDecoration: "none" }}>
                <button className="button-style card-button">Book Now</button>
              </Link>
            </div>
          </div>
          <img
            src={hiveBackdrop}
            alt=""
            className="hive-backdrop"
            width="400px"
          />
        </div>
      </>
    );
  } else if (userrole === "manager") {
    window.location.href = "/add-menu";
    return <div>hello</div>;
  } else if (!userrole && loggedIn === "false") {
    window.location.href = "/newlogin";
  } else if (adminCheck === true) {
    window.location.href = "/admin-view";
  } else if (userrole === "deliveryboy") {
    window.location.href = "/delivery-orders";
  } else {
    return <div>Application is in processing</div>;
  }
};

export default Home;
