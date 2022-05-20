import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoggedInNav from "../LoggedInNav";
import { showCart, Toast } from "../validationError/Checks";
import { api_key, api_url, REQ_URL } from "../../CONSTANTS";

function CustomerOrderItem({ loggedIn }) {
  const history = useHistory();
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [renderCheck, setRenderCheck] = useState(false);
  const [customerLocation, setCustomerLocation] = useState("");

  const userRole = localStorage.getItem("userrole");
  const isManager = userRole === "manager" ? true : false;
  const isAdmin = userRole === "admin@admin" ? true : false;
  const isCustomer = userRole === "customer" ? true : false;
  const isDeliveryBoy = userRole === "deliveryboy" ? true : false;

  useEffect(() => {
    axios({
      method: "GET",
      url: `${REQ_URL}foodorder/get`,
      params: {
        orderid: id,
      },
    }).then((response) => {
      setOrderDetails(response.data.result[0]);
      findLocation(response.data.result[0].customerid);
    });
    axios({
      method: "GET",
      url: `${REQ_URL}restaurant/getall`,
    }).then((response) => {
      setRestaurantDetails(response.data);
    });
  }, [renderCheck]);

  const acceptDelivery = (deliveryboyid, isacceptedfordelivery) => {
    axios({
      method: "POST",
      url: `${REQ_URL}foodorder/update`,
      data: {
        orderid: id,
        deliveryboyid: deliveryboyid,
        isacceptedfordelivery: isacceptedfordelivery,
      },
    }).then((response) => {
      console.log(response.data);
      setRenderCheck(!renderCheck);
    });
  };
  const acceptDinein = (isacceptedfordinein) => {
    axios({
      method: "POST",
      url: `${REQ_URL}foodorder/update`,
      data: {
        orderid: id,
        isacceptedfordinein: isacceptedfordinein,
      },
    }).then((response) => {
      console.log(response.data);
      setRenderCheck(!renderCheck);
    });
  };
  const markComleted = (isCompleted) => {
    axios({
      method: "POST",
      url: `${REQ_URL}foodorder/update`,
      data: {
        orderid: id,
        isCompleted: isCompleted,
      },
    }).then((response) => {
      console.log(response.data);
      setRenderCheck(!renderCheck);
    });
  };
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
        console.log(response.data.results[0].formatted, "customer location");
      });
    });
  };
  if (loggedIn)
    return (
      <>
        {loggedIn == true && <LoggedInNav showCart={showCart} linkTo="/" />}
        <div className="my-5 container">
          <h3 className="text-center my-3 font-weight-bold">Order Summary</h3>
          <div className="order-details w-75 mx-auto py-5">
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Restaurant Name: </div>
              <div>
                {
                  restaurantDetails?.find(
                    (x) => x.managerid === orderDetails.managerid
                  )?.restaurant
                }
              </div>
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Restaurant Address</div>
              <div>
                {
                  restaurantDetails?.find(
                    (x) => x.managerid === orderDetails.managerid
                  )?.address
                }
              </div>
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Dine-In</div>
              <div>{orderDetails.isacceptedfordinein}</div>
              {isCustomer && orderDetails.isacceptedfordinein === "pending" && (
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    acceptDinein("accepted");
                  }}
                >
                  Accept Dine In
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Delivery</div>
              <div>{orderDetails.isacceptedfordelivery}</div>
              {isCustomer && orderDetails.isacceptedfordelivery === "pending" && (
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    acceptDelivery(localStorage.getItem("beeid"), "accepted");
                  }}
                >
                  Accept Delivery
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Customer Location</div>
              <div>{customerLocation}</div>
            </div>
            {orderDetails.isacceptedfordinein === "accepted" && (
              <div className="d-flex justify-content-between">
                <div>No of persons</div>
                <div>{orderDetails.noofpersons}</div>
              </div>
            )}
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Payment Method</div>
              <div>{orderDetails.paymentmethod}</div>
              {isCustomer && orderDetails.paymentmethod === "card" && (
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    Toast("success", "Payment Done");
                  }}
                >
                  Do Payment
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Order Completion</div>
              <div>{orderDetails.isCompleted}</div>
              {isCustomer && orderDetails.isCompleted === "pending" && (
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    markComleted("completed");
                  }}
                >
                  Mark Completed
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div></div>
              <div></div>
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div></div>
              <div></div>
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div></div>
              <div></div>
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div></div>
              <div></div>
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        ;
      </>
    );
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
        <h3>Access Denied</h3>
        <Link to="/newlogin">
          <button className="btn btn-danger">Go to Login page</button>
        </Link>
      </div>
      ;
    </>
  );
}

export default CustomerOrderItem;
