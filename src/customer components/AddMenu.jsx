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
    itemimage: null,
  });
  const handleImageUpload = (e) => {
    setMenu({ ...menu, itemimage: e.target.files[0] });
  };
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
      .post(`${REQ_URL}category/searchbyid`, {
        managerid: localStorage.getItem("beeid"),
      })
      .then((response) => {
        if (response.data.result.length > 0) {
          setMenu({
            ...menu,
            categories: response.data.result.map((categ) => categ.category),
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
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value });
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
    if (menu.category && menu.menuitem && menu.price && menu.itemimage) {
      let formData = new FormData();
      formData.append("itemimage", menu.itemimage);
      formData.append("category", menu.category);
      formData.append("menuitem", menu.menuitem);
      formData.append("price", menu.price);
      formData.append("managerid", userId);

      const displayMenu = {
        ...menu,
        category: menu.category,
        menuitem: menu.menuitem,
        price: menu.price,
        managerid: userId,
      };
      axios
        .post(`${REQ_URL}menu/add`, formData)
        .then((res) => {
          setMenu({
            category: "",
            menuitem: "",
            price: null,
            categories: [],
            itemimage: null,
          });
          Toast("success", "Menu item is added");

          setCheckflag(!checkflag);
          console.log(menu);
        })
        .catch((err) => Toast("error", err.message));
    } else {
      Toast("error", "Some Menu item fields are empty");
    }
  };
  if (userrole === "manager" && approved === true) {
    return (
      <>
        {loggedIn == true && <LoggedInNav showCart={showCart} linkTo="/" />}
        <div className="d-flex justify-content-around align-items-start manage-buttons my-5 w-75 mx-auto outter-box">
          <div className="row justify-content-center align-items-center flex-column w-50">
            <AddRestaurant setCheckflag={setCheckflag} checkflag={checkflag} />
          </div>
          {/* <div className="w-50 mh-"> */}
          <div className="d-flex justify-content-start align-items-center flex-column h-100 w-50 ">
            <Link to="/add-marquee">
              <button className="btn btn-warning">Add Marquee</button>
            </Link>
            <Link to="/add-hall">
              <button className="btn btn-warning my-4 ">Add Hall</button>
            </Link>
            <Link to="/manage-orders">
              <button className="btn btn-warning">View Orders</button>
            </Link>
            {/* </div> */}
          </div>
        </div>
        <h3 className="my-5 color-background-text text-center font-weight-bold">
          Restaurant Management
        </h3>
        <div className="d-flex justify-content-around align-items-start w-75 mx-auto mt-4">
          <AddCategory setCheckflag={setCheckflag} checkflag={checkflag} />

          <div className="add-menu-section d-flex justify-centent-center align-items-start flex-column w-50">
            <h1 className="ml-3">Add Menu</h1>

            <div className="col-1">
              <div className="row-1">
                <form onSubmit={menuSubmit}>
                  <div className="form-group">
                    <label htmlFor="">Categories:</label>
                    <select
                      value={menu.category}
                      onChange={setCategory}
                      name="category"
                      className="py-1 px-2 input-border"
                    >
                      <option selected>Select below</option>
                      {menu.categories.map(function(singlecateg) {
                        return (
                          <option key={singlecateg} value={singlecateg}>
                            {singlecateg}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Item:</label>
                    <input
                      type="text"
                      value={menu.menuitem}
                      onChange={setMenuItem}
                      className="input-border py-2 px-3"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Image:</label>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      alt=""
                      className="input-border py-2 px-3"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Price:</label>
                    <input
                      type="number"
                      value={menu.price}
                      onChange={setPrice}
                      className="input-border py-2 px-3"
                    />
                  </div>

                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-warning"
                  />
                </form>
              </div>
            </div>
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
