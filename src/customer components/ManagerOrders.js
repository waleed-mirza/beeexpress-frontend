import React, { useState } from "react";
import OrderDetails from "./UI'S/OrderDetails";

function ManagerOrders() {
  const [renderCheck, setRenderCheck] = useState(false);
  return (
    <div className="container">
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
