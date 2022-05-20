import React, { useState, useEffect } from "react";
import axios from "axios";

import AddCategory from "./AddCategory";
import LoggedInNav from "./LoggedInNav";
import AddRestaurant from "./AddRestaurant";
import { ToastContainer } from "react-toastify";
import { Toast } from "./validationError/Checks";
import { Link } from "react-router-dom";
import { REQ_URL } from "../CONSTANTS";

const AddMenu = ({ loggedIn, userrole, userId }) => {
  const [menu, setMenu] = useState({
    category: "",
    menuitem: "",
    price: null,
    categories: [],
  });

  const [checkflag, setCheckflag] = useState(false);
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    axios({
      method: "POST",
      url: `${REQ_URL}auth/getprofile`,
      data: {
        userId: localStorage.getItem("beeid"),
      },
    }).then((response) => {
      console.log(response.data.result[0].status, "approved status");
      if (response.data.result[0].status === "approve") {
        setApproved(true);
      } else {
        setApproved(false);
      }
    });

    axios
      .get("http://localhost:5000/category/")
      .then((response) => {
        if (response.data.length > 0) {
          setMenu({
            ...menu,
            categories: response.data.map((categ) => categ.category),
            // category: response.data[0].category,
          });
        }
      })
      .catch((error) => {
        console.log("Error is" + error);
      });
    console.log(userrole, loggedIn, userId, "helooooooooooo");
  }, [checkflag]);

  const setCategory = (e) => {
    // setMenu({ ...menu, category: e.target.value });
    setMenu({ ...menu, category: e.target.value });
    console.log(e.target.value);
  };
  const setMenuItem = (e) => {
    setMenu({ ...menu, menuitem: e.target.value });
  };
  const setPrice = (e) => {
    setMenu({ ...menu, price: e.target.value });
  };
  const showCart = () => {
    var element = document.getElementById("cart");
    element.classList.remove("cart-hide");
    element.classList.add("cart");
  };
  const menuSubmit = (e) => {
    e.preventDefault();
    if (menu.category && menu.menuitem && menu.price) {
      const displayMenu = {
        ...menu,
        category: menu.category,
        menuitem: menu.menuitem,
        price: menu.price,
        managerid: userId,
      };

      axios
        .post("http://localhost:5000/menu/add", displayMenu)
        .then((res) => {
          setMenu({
            category: "",
            menuitem: "",
            price: null,
            categories: [],
          });
          Toast("Menu item is added", "success");

          setCheckflag(!checkflag);
          console.log(menu);
        })
        .catch((err) => console.log(err));
    } else {
      Toast("Some Menu item fields are empty", "error");
    }
  };
  if (userrole === "manager" && approved === true) {
    return (
      <>
        {loggedIn == true && <LoggedInNav showCart={showCart} linkTo="/" />}
        <div className="w-100 row justify-content-around my-5">
          <AddRestaurant setCheckflag={setCheckflag} checkflag={checkflag} />
          <AddCategory setCheckflag={setCheckflag} checkflag={checkflag} />
        </div>
        <div className="w-100 row justify-content-around">
          <div className="d-flex flex-column justify-content-around">
            <Link to="/add-marquee">
              <button className="btn btn-primary">Add Marquee</button>
            </Link>
            <Link to="/add-hall">
              <button className="btn btn-primary">Add Hall</button>
            </Link>
            <Link to="/manage-orders">
              <button className="btn btn-primary">View Orders</button>
            </Link>
          </div>

          <div className="add-menu-section row justify-centent-center flex-column">
            <h1>Add Menu</h1>

            <div className="col-1">
              <div className="row-1">
                <form onSubmit={menuSubmit}>
                  <div className="form-group">
                    <label htmlFor="">Categories:</label>
                    <select
                      value={menu.category}
                      onChange={setCategory}
                      // className="form-control"
                    >
                      <option>Select below</option>
                      {menu.categories.map(function(singlecateg) {
                        return (
                          <option key={singlecateg} value={singlecateg}>
                            {singlecateg}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* <input
            id="category"
            type="text"
            value={menu.category}
            onChange={setCategory}
          /> */}
                  <div className="form-group">
                    <label htmlFor="">Item:</label>
                    <input
                      type="text"
                      value={menu.menuitem}
                      onChange={setMenuItem}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Price:</label>
                    <input
                      type="number"
                      value={menu.price}
                      onChange={setPrice}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
                </form>
              </div>
            </div>
            <p>{menu.category}</p>
            <p>{menu.menuitem}</p>
            <p>{menu.price}</p>
            {/* <p>{JSON.stringify(menu)}</p> */}
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
  } else if (userrole === "customer") {
    window.location.href = "/newlogin";
  } else if (approved === false) {
    return (
      <>
        {loggedIn == true && <LoggedInNav showCart={showCart} linkTo="/" />}
        <div className="d-flex justify-content-center align-items-center mt-5">
          <button className="btn btn-danger">
            Profile has not been approved yet
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Link to="/newlogin">
        <button className="btn btn-danger">Go to Login page</button>
      </Link>
    </div>
  );
};

export default AddMenu;
