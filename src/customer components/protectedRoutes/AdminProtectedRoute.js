import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import LoggedInNav from "../LoggedInNav";
import Nav from "../Nav";
import { showCart } from "../validationError/Checks";

function AdminProtectedRoute({
  component: Component,
  userInformation,
  adminCheck,
  ...rest
}) {
  return (
    <>
      {userInformation.loggedIn === true ? (
        <LoggedInNav showCart={showCart} linkTo="/" />
      ) : (
        <Nav />
      )}
      <Route
        {...rest}
        render={(props) => {
          if (adminCheck === true && userInformation.loggedIn === true) {
            return <Component {...props} />;
          } else {
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
        }}
      />
    </>
  );
}

export default AdminProtectedRoute;
