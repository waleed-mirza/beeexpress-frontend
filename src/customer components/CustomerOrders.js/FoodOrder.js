import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api_key, api_url, REQ_URL } from "../../CONSTANTS";
import { Toast } from "../validationError/Checks";

function FoodOrder({ customerid, managerid, orderid }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [renderCheck, setRenderCheck] = useState(false);
  const [customerLocation, setCustomerLocation] = useState("");
  const history = useHistory();
  const userRole = localStorage.getItem("userrole");
  const isManager = userRole === "manager" ? true : false;
  const isAdmin = userRole === "admin@admin" ? true : false;
  const isCustomer = userRole === "customer" ? true : false;
  const isDeliveryBoy = userRole === "deliveryboy" ? true : false;

  const findLocation = (userid) => {
    axios({
      method: "GET",
      url: `${REQ_URL}location/get`,
      params: {
        userid: userid,
      },
    }).then((response) => {
      const { lat, long } = response.data.result;
      var request_url =
        api_url +
        "?" +
        "key=" +
        api_key +
        "&q=" +
        encodeURIComponent(lat + "," + long) +
        "&pretty=1" +
        "&no_annotations=1";
      axios({
        method: "get",
        url: request_url,
      }).then((response) => {
        setCustomerLocation(response.data.results[0].formatted);
        setRenderCheck(!renderCheck);

        return response.data.results[0].formatted;
      });
    });
  };
  const deleteOrder = (orderid) => {
    axios({
      method: "GET",
      url: `${REQ_URL}foodorder/delete`,
      params: {
        orderid: orderid,
      },
    }).then((response) => {
      Toast("success", "Deleted Successfully");
      setRenderCheck(!renderCheck);
    });
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: `${REQ_URL}foodorder/get`,
      params: {
        customerid: customerid || "",
        managerid: managerid || "",
        orderid: orderid || "",
      },
    }).then((response) => {
      setOrderDetails(response.data.result.reverse());
      setRenderCheck(!renderCheck);
    });
    axios({
      method: "GET",
      url: `${REQ_URL}restaurant/getall`,
    }).then((response) => {
      setRestaurantDetails(response.data);
      setRenderCheck(!renderCheck);
    });
  }, []);
  return (
    <>
      <img
        src="/static/media/Hive Backdrop.0dc89738.svg"
        className="background-delta"
      ></img>
      <div className="my-5 text-over-bg">
        <h2 className="text-center font-weight-bold my-3 color-background-text">
          Food Orders
        </h2>
        {!orderDetails?.length && (
          <div className="my-4 font-weight-bold text-center">No Orders Yet</div>
        )}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Restaurant</th>
              <th scope="col">Restaurant Address</th>
              <th scope="col">Dine-in</th>
              <th scope="col">Delivery</th>
              <th scope="col">DeliveryBoy</th>
              <th scope="col">(Details)</th>
              {!isDeliveryBoy && <th scope="col">(Delete)</th>}
            </tr>
          </thead>
          <tbody>
            {orderDetails?.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {
                      restaurantDetails?.find(
                        (x) => x.managerid === val.managerid
                      )?.restaurant
                    }
                  </td>
                  <td>
                    {
                      restaurantDetails?.find(
                        (x) => x.managerid === val.managerid
                      )?.address
                    }
                  </td>
                  <td>{val.isacceptedfordinein}</td>
                  <td>{val.isacceptedfordelivery}</td>

                  <td>
                    {val.deliveryboyid ? val.deliveryboyid : "Not Accepted"}
                  </td>

                  <td
                    className="row-action"
                    onClick={() => history.push(`customerfoodorder/${val._id}`)}
                  >
                    Details
                  </td>
                  {(isCustomer || isAdmin || isManager) && (
                    <td
                      className="row-action"
                      onClick={() => {
                        deleteOrder(val._id);
                      }}
                    >
                      (Delete)
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FoodOrder;
