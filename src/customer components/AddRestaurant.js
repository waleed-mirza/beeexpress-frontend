import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddRestaurant = ({ checkflag, setCheckflag }) => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/checklogin", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.loggedIn === true) {
          setUserId(res.data.id);
          axios
            .post("http://localhost:5000/restaurant/searchbyid", {
              managerid: res.data.id,
            })
            .then((res) => {
              setRestaurantName(res.data.result);
            });
        }
      });
  }, [checkflag]);

  const [res, setRes] = useState({
    restaurant: "",
  });
  const [userId, setUserId] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");
  const setResaurant = (e) => {
    // setMenu({ ...menu, category: e.target.value });
    setRes({ restaurant: e.target.value });
  };
  const restaurantsubmit = (e) => {
    e.preventDefault();

    const displayRestaurant = {
      restaurant: res.restaurant,
      managerid: userId,
    };

    console.log(displayRestaurant);
    // window.location = "/";
    axios
      .post("http://localhost:5000/restaurant/add", displayRestaurant)
      .then((res) => {
        console.log(res.data);
        setCheckflag(!checkflag);
      });
  };
  if (!restaurantName) {
    return (
      <>
        <div className="Restaurant-section mr-5">
          <h1>Add Restaurant</h1>
          <form onSubmit={restaurantsubmit}>
            <div className="col-1">
              <div className="row-1">
                <div className="form-group">
                  <label htmlFor="">Restaurant:</label>
                  <input
                    id="restaurant"
                    type="text"
                    VALUE={res.restaurant}
                    onChange={setResaurant}
                  />
                </div>
              </div>
              <input type="submit" VALUE="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <div className="text-uppercase font-weight-bold display-3">
        {restaurantName}
      </div>
    );
  }
};

export default AddRestaurant;
