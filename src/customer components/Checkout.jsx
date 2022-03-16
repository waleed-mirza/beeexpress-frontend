import React, { useState, useEffect } from "react";

// Importing components
import CartItems from "./CartItems";
import LoggedInNav from "./LoggedInNav";

// Importing Images
import backArrow from "../images/Back Arrow.svg";

// Importing other packages
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toast } from "./validationError/Checks";

const Checkout = ({ cartItemsAddition, setCartItemsAddition }) => {
  const [inputValues, setInputValues] = useState({
    payment: "",
    orderoption: "",
    reservation: "",
    noofpeople: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValues);

    if (inputValues.payment === "" || inputValues.orderoption === "") {
      Toast("Some fields are empty", "error");
    } else if (
      inputValues.orderoption === "dine-in" &&
      inputValues.reservation === ""
    ) {
      Toast("Please select the reservation option", "error");
    } else if (
      inputValues.reservation === "reservation-yes" &&
      inputValues.noofpeople === ""
    ) {
      Toast("Please enter no of people", "error");
    } else {
      Toast("Your order is in pending", "success");
      const myTimeout = setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };
  // var slider = document.getElementById("myRange");
  // var output = document.getElementById("demo");
  // // output.innerHTML = slider.value;

  // // Update the current slider value (each time you drag the slider handle)
  // slider.oninput = function () {
  //   output.innerHTML = this.value;
  // };
  return (
    <>
      <LoggedInNav />
      <Link to="/menu">
        <img className="checkout-back" src={backArrow} alt="" width="35px" />
      </Link>
      <div className="checkout-section">
        <div className="checkout-section-left">
          <h1>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <p>Select a payment method</p>
            <div className="radio-item">
              <input
                type="radio"
                id="credit-debit-card"
                name="payment"
                value="card"
                onChange={handleInputChange}
              />
              <label htmlFor="credit-debit-card">Credit/Debit Card</label>
            </div>
            <br />
            <div className="radio-item">
              <input
                type="radio"
                id="cash"
                name="payment"
                value="cash"
                onChange={handleInputChange}
              />
              <label htmlFor="cash">Cash</label>
            </div>
            <p>Select order options</p>
            <div className="radio-item">
              <input
                type="radio"
                id="dine-in"
                name="orderoption"
                value="dine-in"
                onChange={handleInputChange}
              />
              <label htmlFor="dine-in">Dine-in</label>
            </div>
            <br />
            <div className="radio-item">
              <input
                type="radio"
                id="takeaway"
                name="orderoption"
                value="takeaway"
                onChange={handleInputChange}
              />
              <label htmlFor="takeaway">Takeaway</label>
            </div>
            {inputValues.orderoption === "dine-in" && (
              <div>
                <p>
                  Since you opted for dine-in, <br /> would you like to reserve
                  a table?
                </p>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="reservation-yes"
                    name="reservation"
                    value="reservation-yes"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="reservation-yes">Yes</label>
                  <div className="no-of-people">
                    <p>No. of people</p>
                    <input
                      type="number"
                      name="noofpeople"
                      id=""
                      size="1"
                      value={inputValues.noofpeople}
                      onChange={handleInputChange}
                    />
                    {/* <div className="slidecontainer">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value="50"
                    className="slider"
                    id="myRange"
                  />
                  <div className="slider-display">
                    <p>
                      People: <span id="demo"></span>
                    </p>
                  </div>
                </div> */}
                  </div>
                </div>
                <br />
                <div className="radio-item">
                  <input
                    type="radio"
                    id="reservation-no"
                    name="reservation"
                    value="reservation-no"
                    onChange={handleInputChange}
                  />
                  <label htmlFor="reservation-no">No</label>
                </div>
              </div>
            )}

            <div>
              <button className="btn btn-primary mt-3" type="submit">
                Book Now
              </button>
            </div>
          </form>
        </div>
        <div className="checkout-section-right">
          <h1>Order Summary</h1>
          <CartItems
            cartItemsAddition={cartItemsAddition}
            setCartItemsAddition={setCartItemsAddition}
            length={cartItemsAddition.length}
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Checkout;
