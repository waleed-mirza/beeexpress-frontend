import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { CheckEmail, Toast } from "./validationError/Checks";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";

//Importing Images
import logo from "../images/Logo.svg";
import { REQ_URL } from "../CONSTANTS";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(false);

  axios.defaults.withCredentials = true;

  const setEmail = (e) => {
    setUser({ ...user, email: e.target.value });
    console.log(e.target.value);
  };
  const setPassword = (e) => {
    setUser({ ...user, password: e.target.value });
    console.log(e.target.value);
  };
  const userSubmit = (e) => {
    e.preventDefault();

    console.log(user.email, user.password);
    if (user.email === "" || user.password === "") {
      Toast("error", "Some Fields are Empty");
    } else if (CheckEmail(user.email)) {
      const displayUser = {
        email: user.email,
        password: user.password,
      };

      // console.log(displayUser);
      axios.post(`${REQ_URL}auth/login`, displayUser).then((res) => {
        if (!res.data.auth) {
          setLoginStatus(false);
          Toast("error", res.data.message || "Not Logged In");
        } else {
          localStorage.setItem("token", res.data.token);
          setLoginStatus(true);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("userrole", res.data.result.userrole);
          localStorage.setItem("beeid", res.data.result._id);

          console.log(res.data.result);
          Toast("success", "Congrats! Logged In");
          window.location = "/";
        }
      });
    } else {
      Toast("error", "Email is not correct");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userLogout") === "1") {
      axios.get(`${REQ_URL}auth/logout`).then((res) => {
        Toast("Logged Out", "success");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userrole");

        localStorage.setItem("userLogout", "0");
      });
    } else {
      axios.get(`${REQ_URL}auth/login`).then((res) => {
        if (res.data.loggedIn == true) {
          setLoginStatus(true);
          Toast("Already Logged In", "success");
          window.location = "/";
        } else {
          console.log("Not logged in");
        }
      });
    }
  }, []);

  return (
    <>
      <div className="cust-login-section">
        <nav className="login-signup-nav">
          <div className="logo">
            <img src={logo} alt="" width="200px" />
            <h1>For Users</h1>
          </div>
          <div className="buttons">
            <Link to="/newsignup">
              <button className="button-style signup-btn">Sign Up</button>
            </Link>
          </div>
        </nav>
        <div className="login-form">
          <form onSubmit={userSubmit}>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input type="email" onChange={setEmail} />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input type="password" onChange={setPassword} />
            </div>
            <input type="submit" value="Login" />
          </form>
          <div>{loginStatus && <button>Check if authenticated</button>}</div>
        </div>
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
};

export default Login;
