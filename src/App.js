// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { useEffect, useState } from "react";

// Importing Components
import Nav from "./customer components/Nav";
import Home from "./customer components/Home";
import About from "./customer components/About";
import Contact from "./customer components/Contact";
import Option from "./customer components/Option";
import FoodOrderPage from "./customer components/FoodOrderPage";
import Menu from "./customer components/Menu";
import Checkout from "./customer components/Checkout";
import Cart from "./customer components/Cart";
import AddMenu from "./customer components/AddMenu";

import BookHallsPage from "./customer components/BookHallsPage";
import Marquee from "./customer components/Marquee";

import Login from "./login signup components/Login";
import Signup from "./login signup components/Signup";

import newLogin from "./customer components/Login";
import newSignup from "./customer components/Signup";

// Importing Other Packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [cartItemsAddition, setCartItemsAddition] = useState([]);

  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/option" component={Option} />

            {/* Food Order Components */}
            <Route path="/food-order">
              <FoodOrderPage
                cartItemsAddition={cartItemsAddition}
                setCartItemsAddition={setCartItemsAddition}
              />
            </Route>
            <Route path="/menu/:id">
              <Menu
                cartItemsAddition={cartItemsAddition}
                setCartItemsAddition={setCartItemsAddition}
              />
            </Route>
            {/* <Route path="/menu/cart" component={Cart} /> */}
            <Route path="/checkout">
              <Checkout
                cartItemsAddition={cartItemsAddition}
                setCartItemsAddition={setCartItemsAddition}
              />
            </Route>

            {/* Hall Booking Components */}
            <Route path="/book-halls" component={BookHallsPage} />
            <Route path="/marquee" component={Marquee} />

            {/* Adding Menu Components */}
            <Route path="/add-menu" component={AddMenu} />

            {/* Adding Login/Signup Components */}
            <Route path="/login" component={Login} />
            <Route path="/newlogin" component={newLogin} />
            <Route path="/signup" component={Signup} />
            <Route path="/newsignup" component={newSignup} />
          </Switch>
          <Cart
            cartItemsAddition={cartItemsAddition}
            setCartItemsAddition={setCartItemsAddition}
            length={cartItemsAddition.length}
          />
        </div>
      </Router>
      <div className="custom-footer">
        <p>© 2021 BeeExpress All Rights Reserved</p>
      </div>
    </>
  );
}

export default App;
