import React from "react";
import FoodOrder from "./FoodOrder";
import PlaceOrder from "./PlaceOrder";

function Order() {
  return (
    <div className="container">
      <FoodOrder customerid={localStorage.getItem("beeid")} />
      <PlaceOrder />
    </div>
  );
}

export default Order;
