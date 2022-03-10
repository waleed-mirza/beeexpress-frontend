import React, { useState, useEffect } from "react";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";

//Importing Images
import logo from "../images/Logo.svg";

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
    const displayUser = {
      email: user.email,
      password: user.password,
    };

    // console.log(displayUser);
    axios.post("http://localhost:5000/auth/login", displayUser).then((res) => {
      if (!res.data.auth) {
        setLoginStatus(false);
        // Display error message
        // setLoginStatus(res.data.message);
      } else {
        localStorage.setItem("token", res.data.token);
        setLoginStatus(true);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userrole", res.data.result.userrole);

        console.log(res.data.email);
        window.location = "/";
      }
    });
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userLogout") === "1") {
      axios.get("http://localhost:5000/auth/logout").then((res) => {
        console.log(res.data);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userrole");

        localStorage.setItem("userLogout", "0");
      });
    } else {
      axios.get("http://localhost:5000/auth/login").then((res) => {
        if (res.data.loggedIn == true) {
          setLoginStatus(true);

          console.log(res.data);
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
            <h1>For Customers</h1>
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
    </>
  );
};

export default Login;
