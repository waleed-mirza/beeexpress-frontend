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
import AddMarquee from "./customer components/AddMarquee";
import axios from "axios";
import EventOrder from "./customer components/EventOrder";
import CustomerProtectedRoute from "./customer components/protectedRoutes/CustomerProtectedRoute";
import ManagerProtectedRoute from "./customer components/protectedRoutes/ManagerProtectedRoute";
import AdminProtectedRoute from "./customer components/protectedRoutes/AdminProtectedRoute";

import { ToastContainer } from "react-toastify";
import ManagerOrders from "./customer components/ManagerOrders";
import AdminDashboard from "./customer components/AdminDashboard";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [adminCheck, setAdminCheck] = useState(false);
  const [cartItemsAddition, setCartItemsAddition] = useState([]);
  const [userInformation, setUserInformation] = useState({
    userId: 0,
    userRole: "",
    loggedIn: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/checklogin", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.loggedIn === true) {
          setUserInformation({
            ...userInformation,
            userId: res.data.id,
            loggedIn: true,
            userRole: localStorage.getItem("userrole"),
          });
          setAdminCheck(res.data.adminCheck);
        }
      });
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            {/* <Route path="/" exact component={Home} /> */}
            <Route path="/" exact>
              <Home adminCheck={adminCheck} />
            </Route>
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/option" component={Option} />

            {/* customer protected */}

            <CustomerProtectedRoute
              userInformation={userInformation}
              component={EventOrder}
              path="/event-order/:id"
            />
            <CustomerProtectedRoute
              path="/marquee/:id"
              component={Marquee}
              userInformation={userInformation}
            />

            {/* customer protected */}
            {/* Manager protected */}
            <ManagerProtectedRoute
              path="/manage-orders"
              component={ManagerOrders}
              userInformation={userInformation}
            />
            {/* Manager protected */}
            {/* admin protected */}
            <AdminProtectedRoute
              path="/admin-view"
              component={AdminDashboard}
              userInformation={userInformation}
              adminCheck={adminCheck}
            />
            {/* admin protected */}
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
            <Route path="/book-halls">
              <BookHallsPage place="hall" />
            </Route>
            <Route path="/book-marquees">
              <BookHallsPage place="marquee" />
            </Route>

            {/* Adding Menu Components */}

            <Route path="/add-menu">
              <AddMenu
                loggedIn={userInformation.loggedIn}
                userrole={userInformation.userRole}
                userId={userInformation.userId}
              />
            </Route>

            {/* Adding Login/Signup Components */}
            <Route path="/login" component={Login} />
            <Route path="/newlogin" component={newLogin} />
            <Route path="/signup" component={Signup} />
            <Route path="/newsignup" component={newSignup} />
            <Route path="/add-marquee" exact>
              <AddMarquee
                userInformation={userInformation}
                userEventCategory="marquee"
              />
            </Route>
            <Route path="/add-hall" exact>
              <AddMarquee
                userInformation={userInformation}
                userEventCategory="hall"
              />
            </Route>
            <Route path="/add-marquee/:id" exact>
              <AddMarquee
                userInformation={userInformation}
                userEventCategory="marquee"
              />
            </Route>
            <Route path="/add-hall/:id" exact>
              <AddMarquee
                userInformation={userInformation}
                userEventCategory="hall"
              />
            </Route>
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

export default App;
