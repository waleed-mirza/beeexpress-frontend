import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Toast } from "./validationError/Checks";
import { REQ_URL } from "../CONSTANTS";

const AddRestaurant = ({ checkflag, setCheckflag }) => {
  useEffect(() => {
    axios
      .get(`${REQ_URL}auth/checklogin`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.loggedIn === true) {
          setUserId(res.data.id);
          axios
            .post(`${REQ_URL}restaurant/searchbyid`, {
              managerid: res.data.id,
            })
            .then((res) => {
              if (res.data.status === "ok")
                setRestaurantName(res.data.result[0]);
            });
        }
      });
  }, [checkflag]);

  const [res, setRes] = useState({
    restaurant: "",
    address: "",
  });
  const [userId, setUserId] = useState(0);
  const [restaurantName, setRestaurantName] = useState("");

  const setResaurant = (e) => {
    const { name, value } = e.target;
    setRes({ ...res, [name]: value });
  };
  const restaurantsubmit = (e) => {
    e.preventDefault();

    if (res.restaurant === "" || res.address === "") {
      Toast("error", "Some Fields are empty");
    } else {
      const displayRestaurant = {
        restaurant: res.restaurant,
        address: res.address,
        managerid: userId,
      };
      axios.post(`${REQ_URL}restaurant/add`, displayRestaurant).then((res) => {
        console.log(res.data);
        Toast("success", "Name registered");
        setCheckflag(!checkflag);
      });
    }
  };
  if (!restaurantName?.restaurant) {
    return (
      <>
        <div className="Restaurant-section d-flex flex-column justify-content-center align-items-start">
          <h1 className="ml-3">Add Restaurant</h1>
          <form onSubmit={restaurantsubmit}>
            <div className="col-1">
              <div className="row-1">
                <div className="form-group">
                  <label htmlFor="">Restaurant Name:</label>
                  <input
                    id="restaurant"
                    name="restaurant"
                    type="text"
                    className="py-1 px-2 input-border"
                    value={res.restaurant}
                    onChange={setResaurant}
                  />
                </div>
              </div>
              <div className="row-1">
                <div className="form-group">
                  <label htmlFor="">Address:</label>
                  <input
                    id="address"
                    name="address"
                    className="py-1 px-2 input-border"
                    type="text"
                    value={res.address}
                    onChange={setResaurant}
                  />
                </div>
              </div>
              <input type="submit" VALUE="Submit" className="btn btn-warning" />
            </div>
          </form>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
  return (
    <>
      <div className="d-flex flex-column">
        <div className="text-uppercase font-weight-bold display-3">
          {restaurantName?.restaurant}
        </div>
        <div className="text-uppercase font-weight-bold display-5">
          {restaurantName?.address}
        </div>
      </div>
    </>
  );
};

export default AddRestaurant;
