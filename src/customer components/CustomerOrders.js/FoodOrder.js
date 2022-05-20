import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { api_key, api_url, REQ_URL } from "../../CONSTANTS";

function FoodOrder({ customerid, managerid, orderid }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [customerLocation, setCustomerLocation] = useState("");
  const history = useHistory();

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
      setOrderDetails(response.data.result);
    });
    axios({
      method: "GET",
      url: `${REQ_URL}restaurant/getall`,
    }).then((response) => {
      setRestaurantDetails(response.data);
    });
    findLocation(customerid);
  }, []);
  return (
    <div className="my-5">
      <h2 className="text-center font-weight-bold my-3">Food Orders</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Restaurant</th>
            <th scope="col">Restaurant Address</th>
            <th scope="col">Dine-in</th>
            <th scope="col">Delivery</th>
            <th scope="col">DeliveryBoy</th>
            <th scope="col">Customer Location</th>
            <th scope="col">(Details)</th>
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
                <td>{customerLocation}</td>
                <td
                  className="row-action"
                  onClick={() => history.push(`customerfoodorder/${val._id}`)}
                >
                  Details
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FoodOrder;
