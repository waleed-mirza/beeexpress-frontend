import React, { useState, useEffect } from "react";

//Importing Components
import LoggedInNav from "./LoggedInNav";

// Importing Images
import marqueeBg from "../images/Marquee BG.svg";

import backArrow from "../images/Back Arrow.svg";

// Importing other packages
import { Link } from "react-router-dom";
import one from "../images/1.jpg";
import two from "../images/1.jpeg";
import three from "../images/2.jpeg";
import four from "../images/3.jpeg";
import five from "../images/4.jpeg";
import six from "../images/5.jpeg";
import seven from "../images/6.jpeg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { REQ_URL } from "../CONSTANTS";
import { useHistory } from "react-router-dom";
import { Toast } from "./validationError/Checks";
import EventOrder from "./EventOrder";
import { EventBg } from "./BackgroundImage";

const images = ["/static/media/1.jpg"];
const Marquee = () => {
  const { id } = useParams();
  const history = useHistory();
  const [profileData, setProfileData] = useState({});
  const [marqueeDetails, setMarqueeDetails] = useState({});
  const [inOrderDetail, setInOrderDetail] = useState({
    noofpersons: "",
    eventtype: "",
    eventdate: new Date(),
  });
  const [orderId, setOrderId] = useState(0);
  const [renderCheck, setRenderCheck] = useState(false);

  useEffect(() => {
    axios({
      method: "POST",
      url: `${REQ_URL}auth/getprofile`,
      data: {
        userid: localStorage.getItem("beeid"),
      },
    }).then((response) => {
      setProfileData(response.data.result[0]);
    });
    axios({
      mehtod: "GET",
      url: `${REQ_URL}marquee/getbyid`,
      params: {
        managerid: "",
        marqueeid: id,
      },
    }).then((response) => {
      setMarqueeDetails(response.data.result[0]);
    });
  }, [renderCheck]);
  const onOrderCreation = () => {
    console.log(inOrderDetail, "inorderdetails");
    if (inOrderDetail.noofpersons > 2000) {
      Toast("error", "No of persons should be less than 2000");
      return;
    }
    axios({
      method: "POST",
      url: `${REQ_URL}eventorder/create`,
      data: {
        placeid: id,
        managerid: marqueeDetails.managerid,
        customerid: localStorage.getItem("beeid"),
        placetype: marqueeDetails.category,
        eventlocation: marqueeDetails.address,
        ...inOrderDetail,
      },
    })
      .then((response) => {
        Toast("success", "Order Placed");
        setOrderId(response.data.result._id);
        history.go(0);
      })
      .catch((err) => {
        Toast("error", "Server is not responding");
      });
  };
  return (
    <>
      {/* <LoggedInNav hideCart={{ display: "none" }} /> */}
      <img
        src="/static/media/Hive Backdrop.0dc89738.svg"
        className="background-delta"
      ></img>
      <EventBg />

      <div className="marquee-section">
        <div className="marquee-title">
          <Link to="/option">
            <img src={backArrow} alt="" width="35px" />
          </Link>
          <h1 className="my-2 color-background-text">
            {marqueeDetails?.name?.toUpperCase()}
          </h1>
          {/* <p>Starting from 20,000 PKR</p> */}
        </div>
        <div className="marquee-details">
          <div className="location">
            <i className="fa fa-map-marker"></i>
            <p>{marqueeDetails?.address}</p>
          </div>
          <div className="phone">
            <i className="fa fa-phone"></i>
            <p>{profileData?.mobilenumber}</p>
          </div>
          <div className="email">
            <i className="fa fa-envelope"></i>
            <p>{profileData?.email}</p>
          </div>
        </div>
        <div className="marquee-services">
          <h1 className="color-background-text">Services available</h1>
          <div className="marquee-services-cards">
            {marqueeDetails?.services?.map((val, index) => {
              return (
                <div className="marquee-services-card">
                  <i className="fa fa-check-square"></i>
                  <p>{val}</p>
                </div>
              );
            })}
            {marqueeDetails?.services && !marqueeDetails.services?.length && (
              <p>No Data Yet</p>
            )}
          </div>
        </div>
        <div className="marquee-gallery">
          <h1 className="color-background-text">Venue Gallery</h1>
          <div className="marquee-images container w-75 mx-auto">
            {marqueeDetails?.images?.map((val, index) => {
              return (
                <div width="350px" className="position-relative">
                  <img src={val} alt="vanue image here" className="img-fluid" />
                </div>
              );
            })}
            {marqueeDetails?.images && !marqueeDetails.images?.length && (
              <p>No Data Yet</p>
            )}
          </div>
        </div>

        <EventOrder
          orderid={orderId}
          setInOrderDetail={setInOrderDetail}
          onOrderCreation={onOrderCreation}
        />
        {!history.location.pathname.includes("marquee") && (
          <div className="book-now-btn">
            {/* <Link to="/checkout"> */}
            <button className="button-style" onClick={onOrderCreation}>
              Book Now
            </button>{" "}
            {/* </Link> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Marquee;
