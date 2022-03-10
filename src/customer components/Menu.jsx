import React, { useState, useEffect } from "react";

// Importing other packages
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import axios from "axios";

// Importing Components
// import Nav from "../components/Nav";
import LoggedInNav from "./LoggedInNav";
import Cart from "./Cart";

// Importing Images
import backArrow from "../images/Back Arrow.svg";
import { useSearchParams } from "react-router-dom";

// const category = [
//   {
//     id: 1,
//     name: "Burgers",
//   },
//   {
//     id: 2,
//     name: "Shakes",
//   },
// ];

// const menus = [
//   {
//     id: 1,
//     category: "Burgers",
//     name: "Zinger",
//     price: 190,
//   },
//   {
//     id: 2,
//     category: "Burgers",
//     name: "Chicken",
//     price: 160,
//   },
//   {
//     id: 3,
//     category: "Burgers",
//     name: "Beef",
//     price: 120,
//   },
//   {
//     id: 4,
//     category: "Burgers",
//     name: "Double Zinger",
//     price: 410,
//   },
//   {
//     id: 5,
//     category: "Burgers",
//     name: "Double Chicken",
//     price: 110,
//   },
//   {
//     id: 6,
//     category: "Burgers",
//     name: "Club sandwich",
//     price: 100,
//   },
//   {
//     id: 7,
//     category: "Shakes",
//     name: "Vanilla",
//     price: 110,
//   },
//   {
//     id: 8,
//     category: "Shakes",
//     name: "Chocolate",
//     price: 110,
//   },
//   {
//     id: 9,
//     category: "Burgers",
//     name: "Triple Stacker",
//     price: 100,
//   },
//   {
//     id: 10,
//     category: "Shakes",
//     name: "Strawberry",
//     price: 200,
//   },
// ];

const showCart = () => {
  var element = document.getElementById("cart");
  element.classList.remove("cart-hide");
  element.classList.add("cart");
};

const Menu = (props) => {
  const [userId, setUserId] = useState(0);
  const [length, setLength] = useState(0);
  const [menu, setMenu] = useState([]);
  const [cat, setCat] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [cartItemsAddition, setCartItemsAddition] = useState([]);
  useEffect(() => {
    const param = window.location.pathname.split("/")[2];

    axios
      .get("http://localhost:5000/auth/checklogin", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.loggedIn === true) setUserId(res.data.id);
        axios
          .get("http://localhost:5000/menu")
          .then((response) => {
            // setMenu({ menus: response.data });
            let result = response.data;
            let temp = [];
            for (let index = 0; index < response.data.length; index++) {
              if (response.data[index].managerid === param) {
                temp.push(response.data[index]);
              }
            }

            setMenu(temp);
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get("http://localhost:5000/category")
          .then((response) => {
            // setCat({ categ: response.data });

            let result = response.data;
            let temp = [];

            for (let index = 0; index < response.data.length; index++) {
              if (response.data[index].managerid === param) {
                temp.push(response.data[index]);
              }
            }
            setCat(temp);
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .get("http://localhost:5000/restaurant/getall")
          .then((response) => {
            // setMenu({ restaurant: response.data });
            let result = response.data;
            let temp = [];
            for (let index = 0; index < response.data.length; index++) {
              if (response.data[index].managerid === param) {
                temp.push(response.data[index]);
              }
            }
            setRestaurant(temp);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);
  const addingItemsToCart = () => {};

  return (
    <>
      <LoggedInNav showCart={showCart} linkTo="/menu/cart" />
      <div className="menu-section">
        <div className="menu-title">
          <Link to="/food-order">
            <img src={backArrow} alt="" width="35px" />
          </Link>
          <h1>
            {restaurant.length > 0 ? restaurant[0].restaurant : "Not defined"}
          </h1>
          <p>Select items from the menu</p>
        </div>
        <div className="menu d-flex flex-wrap">
          {/* {cat.map((newcat) => (
            <div key={newcat._id}>
              <h1>{newcat.category}</h1>
              <p>{newcat.menuitem}</p>
            </div>
          ))} */}

          {/* {category.map((categories) => (
            <div className="menu-category">
              <h1>{categories.name}</h1>
              <div className="menu-items">
                {menus.map((menuItem) =>
                  categories.name == menuItem.category ? (
                    <div className="menu-item">
                      <div className="menu-item-desc">
                        <h2>{menuItem.name}</h2>
                        <p>PKR {menuItem.price}</p>
                      </div>
                      <i className="fa fa-plus-square"></i>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))} */}

          {menu.map((categories) => (
            <div className="menu-item m-2 p-2 mx-5" key={categories._id}>
              <h1>{categories.category}</h1>
              <div className="menu-item-desc">
                <h2>{categories.menuitem}</h2>
                <p>{categories.price}</p>
              </div>
              <i
                className="fa fa-plus-square"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  let temp = categories;
                  setCartItemsAddition([...cartItemsAddition, temp]);
                  let temp1 = length + 1;
                  setLength(temp1);
                }}
              ></i>
            </div>
          ))}
        </div>
      </div>
      <Cart
        linkTo="/food-order"
        cartItemsAddition={cartItemsAddition}
        length={length}
      />
    </>
  );
};

export default Menu;
