import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoggedInNav from "../LoggedInNav";
import { showCart, Toast } from "../validationError/Checks";
import { api_key, api_url, REQ_URL } from "../../CONSTANTS";
import Rating from "@mui/material/Rating";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div className="font-weight-bold pin1-text">
    <span className="pin1"> {text}</span>
    {/* {text} */}
  </div>
);
const defaultProps = {
  center: {
    lat: 32.1014,
    lng: 74.88,
  },
  zoom: 5,
};

function CustomerOrderItem({ loggedIn }) {
  const history = useHistory();
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [renderCheck, setRenderCheck] = useState(false);
  const [customerLocation, setCustomerLocation] = useState("");
  const [paymentCheck, setPaymentCheck] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [rating, setRating] = useState(0);
  const [allItems, setAllItems] = useState([]);
  const deliveryCharges = 50;

  const [customerCoords, setCustomerCoords] = useState([]);
  const [deliveryBoyCoords, setDeliveryBoyCoords] = useState({});
  const [switchData, setSwitchData] = useState([]);

  const userRole = localStorage.getItem("userrole");
  const isManager = userRole === "manager" ? true : false;
  const isAdmin = userRole === "admin@admin" ? true : false;
  const isCustomer = userRole === "customer" ? true : false;
  const isDeliveryBoy = userRole === "deliveryboy" ? true : false;
  const name = ["customer", "deliveryboy"];

  useEffect(() => {
    axios({
      method: "GET",
      url: `${REQ_URL}menu/`,
      data: {},
    }).then((response) => {
      setAllItems(response.data);
    });
    axios({
      method: "POST",
      url: `${REQ_URL}auth/getprofile`,
      data: {},
    }).then((response) => {
      setUserDetails(response.data.result);
    });
    axios({
      method: "GET",
      url: `${REQ_URL}foodorder/get`,
      params: {
        orderid: id,
      },
    }).then(async (response) => {
      setOrderDetails(response.data.result[0]);
      findLocation(await response.data.result[0].customerid);
      getCoords(
        response.data.result[0].customerid,
        response.data.result[0].deliveryboyid
      );
    });
    axios({
      method: "GET",
      url: `${REQ_URL}restaurant/getall`,
    }).then((response) => {
      setRestaurantDetails(response.data);
    });
  }, [renderCheck]);
  useEffect(() => {
    // const interval = setInterval(() => {
    getCoords();
    // }, 30000);
    // return () => clearInterval(interval);
  }, []);

  const acceptDelivery = (deliveryboyid, isacceptedfordelivery) => {
    axios({
      method: "POST",
      url: `${REQ_URL}foodorder/update`,
      data: {
        orderid: id,
        deliveryboyid: deliveryboyid,
        isacceptedfordelivery: isacceptedfordelivery,
      },
    })
      .then((response) => {
        setRenderCheck(!renderCheck);
        Toast("success", "Delivery Accepted");
      })
      .catch((err) => {
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
    })
      .then((response) => {
        Toast("success", "Dine-In Accepted");
        setRenderCheck(!renderCheck);
      })
      .catch((err) => {
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
    })
      .then((response) => {
        console.log(response.data);
        setRenderCheck(!renderCheck);
        Toast("success", "Order Completed");
      })
      .catch((err) => {
        setRenderCheck(!renderCheck);
      });
  };
  const giveReview = (value) => {
    axios({
      method: "POST",
      url: `${REQ_URL}foodorder/update`,
      data: {
        orderid: id,
        review: value,
      },
    })
      .then((response) => {
        console.log(response.data);
        setRenderCheck(!renderCheck);
        Toast("success", "Sent Review");
      })
      .catch((err) => {
        setRenderCheck(!renderCheck);
      });
  };
  const onPaymentDone = () => {
    axios({
      method: "POST",
      url: `${REQ_URL}foodorder/update`,
      data: {
        orderid: id,
        paymentmethod: "Done",
      },
    })
      .then((response) => {
        Toast("success", "Sent Payment");
        setRenderCheck(!renderCheck);
      })
      .catch((err) => {
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
      if (response.data.result) {
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
      }
    });
  };
  const totalPrice = (itemsorder) => {
    let total = 0;
    itemsorder?.forEach((element) => {
      total += allItems?.find((x) => x._id === element)?.price;
    });
    console.log(orderDetails.isacceptedfordelivery, "din in");
    if (orderDetails.isacceptedfordelivery !== "cancel")
      return total + deliveryCharges;
    return total;
  };
  function getCoords(customerid, deliveryboyid) {
    // if (orderDetails?.customerid) {
    // console.log("customer getlocatons");
    setCustomerCoords([]);
    axios({
      method: "GET",
      url: `${REQ_URL}location/locationall`,
      params: {
        // userid: orderDetails.customerid,
      },
    }).then((response) => {
      let customer = response.data.result.find((x) => x.userid === customerid);
      let deliveryboy = response.data.result.find(
        (x) => x.userid === deliveryboyid
      );

      let data = [];
      data.push(customer);
      data.push(deliveryboy);

      console.log(data, "location data");
      // setSwitchData(data);
      setCustomerCoords(data);
      // setCustomerCoords(customer);
      // setDeliveryBoyCoords(deliveryboy);
    });
    // }
    // if (orderDetails?.deliveryboyid) {
    //   console.log("delivery boy getlocatons");

    //   axios({
    //     method: "GET",
    //     url: `${REQ_URL}location/get`,
    //     params: {
    //       userid: orderDetails.deliveryboyid,
    //     },
    //   }).then((response) => {
    //     setDeliveryBoyCoords(response.data.result);
    //   });
    // }
  }
  if (loggedIn)
    return (
      <>
        {loggedIn == true && <LoggedInNav showCart={showCart} linkTo="/" />}

        <div className="my-5 container">
          <h3 className="text-center my-3 font-weight-bold color-background-text">
            Order Summary
          </h3>
          <div className="order-details w-75 mx-auto py-5">
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Restaurant Name: </div>
              <div className="display-4 font-weight-bold color-background-text">
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
              {isManager && orderDetails.isacceptedfordinein === "pending" && (
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

              {isDeliveryBoy &&
              orderDetails.isacceptedfordelivery === "pending" ? (
                <div
                  className="btn btn-warning"
                  onClick={() => {
                    acceptDelivery(localStorage.getItem("beeid"), "accepted");
                  }}
                >
                  Accept Delivery
                </div>
              ) : (
                <div>
                  {
                    userDetails?.find(
                      (x) => x._id === orderDetails.deliveryboyid
                    )?.name
                  }
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Customer Location</div>
              <div>{customerLocation}</div>
            </div>
            {orderDetails.isacceptedfordelivery === "cancel" && (
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
                    setPaymentCheck(!paymentCheck);
                    Toast("success", "Payment Done");
                  }}
                >
                  Do Payment
                </div>
              )}
              {paymentCheck && (
                <div>
                  <form onSubmit={onPaymentDone}>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Account Title:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Card Number: </label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Account Pin: </label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>

                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
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
              <div>Rating</div>

              {isCustomer &&
              orderDetails?.review === 0 &&
              orderDetails?.isCompleted === "completed" ? (
                <Rating
                  name="half-rating"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                    giveReview(newValue);
                  }}
                />
              ) : (
                <Rating
                  name="half-rating-read"
                  defaultValue={orderDetails.review}
                  precision={0.5}
                  readOnly
                />
              )}
            </div>
            <div className="d-flex justify-content-between my-5 align-items-center">
              <div>Items</div>
              <div className="d-flex justify-content-between align-items-center flex-column">
                {orderDetails?.itemsorder?.map((val, index) => {
                  return (
                    <div>
                      {allItems?.find((x) => x._id === val)?.menuitem}:
                      {allItems?.find((x) => x._id === val)?.price}/Rs
                    </div>
                  );
                })}
                {orderDetails.isacceptedfordelivery !== "cancel" && (
                  <div>Delivery Charges:50/Rs</div>
                )}
                <div>Total: {totalPrice(orderDetails.itemsorder)}</div>
              </div>
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
        <div className="map-container container">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDZIpOewtiUkfBBfsDMPeJ8zZzxYJE1oQE",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {/* <AnyReactComponent
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
              text={"Customer"}
            /> */}
            {/* <AnyReactComponent
              lat={customerCoords?.[0]?.lat}
              lng={customerCoords?.[0]?.long}
              text={"Customer"}
            />
            <AnyReactComponent
              lat={customerCoords?.[1]?.lat}
              lng={customerCoords?.[1]?.long}
              text={"DeliveryBoy"}
            /> */}
            {customerCoords?.map((val, index) => {
              return (
                <AnyReactComponent
                  lat={val?.lat}
                  lng={val?.long}
                  text={name[index]}
                />
              );
            })}
          </GoogleMapReact>
        </div>
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
