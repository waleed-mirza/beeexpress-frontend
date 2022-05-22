import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { REQ_URL } from "../CONSTANTS";
import LoggedInNav from "./LoggedInNav";
import { showCart, Toast } from "./validationError/Checks";

function UpdateProfile({ loggedIn }) {
  let history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    mobilenumber: "",
    city: "",
    CNIC: "",
    userrole: "",
  });
  useEffect(() => {
    axios({
      method: "POST",
      url: `${REQ_URL}auth/getprofile`,
      data: {
        userId: localStorage.getItem("beeid"),
      },
    }).then((response) => {
      setUser(response.data.result[0]);
    });
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const userSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${REQ_URL}auth/updateprofile`,
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        mobilenumber: user.mobilenumber,
        CNIC: user.CNIC,
        city: user.city,
      },
    })
      .then((response) => {
        Toast("success", "Profile Updated Successfully");
      })
      .catch((err) => {
        Toast("error", "Server Error");
      });
  };
  const deleteProfile = () => {
    let userId = localStorage.getItem("beeid");
    localStorage.setItem("userLogout", "1");

    axios({
      method: "POST",
      url: `${REQ_URL}auth/deleteprofile`,
      data: {
        userId: userId,
      },
    })
      .then((response) => {
        Toast("success", "Profile Deleted Successfully");
        setTimeout(function() {
          history.push(`/newlogin`);
        }, 3000);
      })
      .catch((err) => {
        Toast("err", "Server Error");
      });
  };
  if (loggedIn)
    return (
      <>
        <LoggedInNav showCart={showCart} linkTo="/" />
        <img
          src="/static/media/Hive Backdrop.0dc89738.svg"
          className="background-delta"
        ></img>
        <h2 className="color-background-text font-weight-bold text-center my-5">
          Update Profile
        </h2>
        <div className="d-flex justify-content-center align-items-center my-4">
          <button
            className="btn btn-warning text-center"
            onClick={() => {
              deleteProfile();
            }}
          >
            Delete Profile
          </button>
        </div>

        <div className="cust-signup-section">
          <div className="signup-form">
            <form onSubmit={userSubmit}>
              <div className="col-1">
                <div className="row-1">
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      name="email"
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row-1">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInputChange}
                      value={user.name}
                    />
                  </div>
                  {/* <div className="form-group">
                  <label htmlFor="">Confirm Password</label>
                  <input type="password" />
                </div> */}
                </div>
                <div className="row-1">
                  <div className="form-group">
                    <label htmlFor="">Mobile No.</label>
                    <input
                      type="number"
                      name="mobilenumber"
                      onChange={handleInputChange}
                      value={user.mobilenumber}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">CNIC</label>
                    <input
                      type="number"
                      name="CNIC"
                      onChange={handleInputChange}
                      value={user.CNIC}
                    />
                  </div>
                </div>
                <div className="row-1">
                  <div className="form-group">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      name="city"
                      onChange={handleInputChange}
                      value={user.city}
                    />
                  </div>

                  {/* <div className="form-group">
                  <label htmlFor="">Upload Documents</label>
                  <input type="text" />
                </div> */}
                </div>
              </div>

              <input type="submit" value="Update" />
            </form>
          </div>
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

export default UpdateProfile;
