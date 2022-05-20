import React, { useEffect, useState } from "react";
import OrderDetails from "../UI'S/OrderDetails";
function PlaceOrder() {
  const [renderCheck, setRenderCheck] = useState(false);
  useEffect(() => {}, [renderCheck]);
  return (
    <>
      <OrderDetails
        userid={localStorage.getItem("beeid")}
        filter=""
        renderCheck={renderCheck}
        userRole="customer"
      />
    </>
  );
}

export default PlaceOrder;
