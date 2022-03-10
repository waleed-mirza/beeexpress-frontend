import React, { useState } from "react";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";

//Importing Images
import logo from "../images/Logo.svg";

const Signup = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    mobilenumber: "",
    city: "",
    CNIC: "",
    userrole: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const userSubmit = (e) => {
    e.preventDefault();
    const displayUser = {
      email: user.email,
      password: user.password,
      name: user.name,
      mobilenumber: user.mobilenumber,
      city: user.city,
      CNIC: user.CNIC,
      userrole: user.userrole,
    };

    window.location = "/newlogin";
    axios
      .post("http://localhost:5000/auth/register", displayUser)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <div className="cust-signup-section">
        <nav className="login-signup-nav">
          <div className="logo">
            <img src={logo} alt="" width="200px" />
            <h1>For Customers</h1>
          </div>
          <div className="buttons">
            <Link to="/newlogin">
              <button className="button-style signup-btn">Login</button>
            </Link>
          </div>
        </nav>
        <div className="signup-form">
          <form onSubmit={userSubmit}>
            <div className="col-1">
              <div className="row-1">
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    name="email"
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
                <div class="form-group mt-5">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="userrole"
                      id="inlineRadio1"
                      onChange={handleInputChange}
                      value="customer"
                    />
                    <label class="form-check-label" htmlFor="inlineRadio1">
                      Customer
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="userrole"
                      id="inlineRadio2"
                      onChange={handleInputChange}
                      value="manager"
                    />
                    <label class="form-check-label" htmlFor="inlineRadio2">
                      Manager
                    </label>
                  </div>
                </div>
                {/* <div className="form-group">
                  <label htmlFor="">Upload Documents</label>
                  <input type="text" />
                </div> */}
              </div>
            </div>

            <input type="submit" value="Signup" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
