import React, { useState, useEffect } from "react";

//Importing Components
import LoggedInNav from "./LoggedInNav";

// Importing Images
import marqueeBg from "../images/Marquee BG.svg";
import backArrow from "../images/Back Arrow.svg";
import one from "../images/1.jpg";
import two from "../images/1.jpeg";
import three from "../images/2.jpeg";
import four from "../images/3.jpeg";
import five from "../images/4.jpeg";
import six from "../images/5.jpeg";
import seven from "../images/6.jpeg";

// Importing other packages
import { Link } from "react-router-dom";
import axios from "axios";
import { REQ_URL } from "../CONSTANTS";
import { Toast } from "./validationError/Checks";

const marquees = [
  {
    id: 1,
    name: "Marhaba",
    capacity: 100,
    parkingSpace: 50,
    image: one,
  },
  {
    id: 2,
    name: "Ghafoor",
    capacity: 200,
    parkingSpace: 70,
    image: two,
  },
  {
    id: 3,
    name: "Helix",
    capacity: 300,
    parkingSpace: 170,
    image: three,
  },
  {
    id: 4,
    name: "Greenland",
    capacity: 150,
    parkingSpace: 55,
    image: seven,
  },
  {
    id: 5,
    name: "Sikandar",
    capacity: 190,
    parkingSpace: 47,
    image: six,
  },
  {
    id: 6,
    name: "Billay",
    capacity: 130,
    parkingSpace: 34,
    image: marqueeBg,
  },
];

const hideCart = () => {};
const BookHallsPage = ({ place }) => {
  const [marqueeDetails, setMarqueeDetails] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${REQ_URL}marquee/getall`,
    })
      .then((response) => {
        if (response.data.status === "ok")
          for (let index = 0; index < response.data.result.length; index++) {
            if (response.data.result[index].category === place) {
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
  return (
    <>
      <LoggedInNav hideCart={{ display: "none" }} />
      <div className="book-halls">
        <div className="book-halls-title title">
          <h1>Book {place}</h1>
          <p>
            Here you can book {place} for events like <br /> wedding, birthdays
            and more
          </p>
        </div>
        <div className="search-section ">
          <p>You can browse through places here</p>
          <form className="search-form" action="">
            <input type="text" placeholder="Search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <div className="search-results">
          <div className="grid">
            {/* Cards Start */}
            {marqueeDetails?.map((marquee, index) => (
              <div className="card">
                <div className="card-image">
                  <img src={marquee.images?.[0]} alt="" width="100%" />
                  <h1>{marquee.name}</h1>
                </div>
                <div className="card-info">
                  <div className="card-left">
                    <div className="card-info-dist">
                      <i className="fa fa-users"></i>
                      <p> {marquee.capacity}</p>
                    </div>
                    <div className="card-info-time">
                      <i className="fa fa-car"></i>
                      <p> {marquee.parkingSpace}</p>
                    </div>
                  </div>
                  <div className="forward-arrow">
                    <Link to={`/marquee/${marquee._id}`}>
                      <img src={backArrow} alt="" width="30px" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* Cards End */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookHallsPage;
