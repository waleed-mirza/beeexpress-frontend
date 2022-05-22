import React, { useState, useEffect } from "react";

// Importing other packages
import { Link } from "react-router-dom";

// Importing components
import CartItems from "./CartItems";

const hideCart = () => {
  var element = document.getElementById("cart");
  element.classList.add("cart-hide");
};

const Cart = ({ cartItemsAddition, length, setCartItemsAddition }) => {
  useEffect(() => {
    console.log(cartItemsAddition);
  }, [length]);
  return (
    <>
      <div id="cart" className="cart-hide">
        <div style={{ textDecoration: "none" }}>
          <button className="close-btn">
            <i className="fa fa-times" onClick={hideCart}></i>
          </button>
        </div>
        <h1 className="color-background-text">Cart</h1>
        <CartItems
          cartItemsAddition={cartItemsAddition}
          setCartItemsAddition={setCartItemsAddition}
          length={length}
        />

        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="checkout-button">
            <button className="button-style card-button checkout-btn">
              Checkout
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Cart;
