import React, { useState } from "react";
import FoodOrder from "./CustomerOrders.js/FoodOrder";
import OrderDetails from "./UI'S/OrderDetails";

function ManagerOrders() {
  const [renderCheck, setRenderCheck] = useState(false);
  return (
    <div className="container">
      <FoodOrder managerid={localStorage.getItem("beeid")} />
      <OrderDetails
        userid=""
        filter=""
        renderCheck={renderCheck}
        userRole="manager"
      />
    </div>
  );
}

export default ManagerOrders;
