import React, { useState } from "react";
import OrderDetails from "./UI'S/OrderDetails";

function AdminDashboard() {
  const [renderCheck, setRenderCheck] = useState(false);
  return (
    <div>
      <OrderDetails
        userid=""
        filter=""
        renderCheck={renderCheck}
        userRole="admin"
      />
    </div>
  );
}

export default AdminDashboard;
