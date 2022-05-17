import React from "react";
import "../App.css";

//Importing Images
import logo from "../images/Logo.svg";

//Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";

//Importing Components

const LoggedInNav = ({ showCart, hideCart }) => {
  const logoutUser = () => {
    localStorage.setItem("userLogout", "1");
  };
  return (
    <div className="navStyle">
      <img src={logo} alt="" width="200px" />
      <ul>
        <Link to="/" style={{ textDecoration: "none" }}>
          <li>Home</li>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <li>About</li>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <li>Contact</li>
        </Link>
        <Link
          to="/newlogin"
          onClick={logoutUser}
          style={{ textDecoration: "none" }}
        >
          <li>Logout</li>
        </Link>
      </ul>
      <div className="profile">
        <h1>Profile-{localStorage.getItem("email")}</h1>
      </div>
      <div className="nav-buttons">
        <div style={{ textDecoration: "none" }}>
          <button className="cart-btn" style={hideCart}>
            <i className="fa fa-shopping-cart" onClick={showCart}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedInNav;
