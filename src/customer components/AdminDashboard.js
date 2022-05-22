import React, { useState } from "react";
import ManagerDetails from "./ManagerDetails";
import OrderDetails from "./UI'S/OrderDetails";

function AdminDashboard() {
  const [renderCheck, setRenderCheck] = useState(false);
  return (
    <div>
      <img
        src="/static/media/Hive Backdrop.0dc89738.svg"
        className="background-delta-reverse"
      ></img>
      <OrderDetails
        userid=""
        filter=""
        renderCheck={renderCheck}
        userRole="admin"
      />

      <ManagerDetails
        userid=""
        filter=""
        renderCheck={renderCheck}
        userRole="admin"
      />
    </div>
  );
}

export default AdminDashboard;
