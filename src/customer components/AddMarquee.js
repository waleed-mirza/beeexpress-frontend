import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { REQ_URL } from "../CONSTANTS";
import LoggedInNav from "./LoggedInNav";
import Marquee from "./UI'S/Marquee";
import UpdateMarquee from "./UI'S/UpdateMarquee";
import VenueDetails from "./UI'S/VenueDetails";
import { Toast } from "./validationError/Checks";

function AddMarquee({ userInformation, userEventCategory }) {
  const { id } = useParams();
  const [marqueeDetails, setMarqueeDetails] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios({
      method: "GET",
      url: `${REQ_URL}marquee/getbyid`,
      params: {
        managerid: localStorage.getItem("beeid"),
      },
    })
      .then((response) => {
        if (response.data.status === "ok")
          for (let index = 0; index < response.data.result.length; index++) {
            if (response.data.result[index].category === userEventCategory) {
              setMarqueeDetails([
                ...marqueeDetails,
                response.data.result[index],
              ]);
            }
          }
      })
      .catch((e) => {
        Toast("error", "Server does't respond");
      });
  }, []);
  const showCart = () => {
    var element = document.getElementById("cart");
    element.classList.remove("cart-hide");
    element.classList.add("cart");
  };
  if (
    userInformation.userRole === "manager" &&
    userInformation.loggedIn === true
  ) {
    return (
      <>
        {userInformation.loggedIn === true && (
          <LoggedInNav showCart={showCart} linkTo="/" />
        )}

        {id ? (
          <UpdateMarquee userEventCategory={userEventCategory} id={id} />
        ) : (
          <Marquee userEventCategory={userEventCategory} />
        )}
        <div className="d-flex justify-content-center align-items-center mt-4">
          <div
            className="h4 btn btn-warning"
            onClick={() => {
              history.push(`/`);
            }}
          >
            DONE
          </div>
        </div>
        <VenueDetails
          userEventCategory={userEventCategory}
          marqueeDetails={marqueeDetails}
        />
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
}

export default AddMarquee;
