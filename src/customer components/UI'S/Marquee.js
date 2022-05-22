import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "../validationError/Checks";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Marquee({ userEventCategory, marqueeid }) {
  const history = useHistory();
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    service: "",
    image: "",
  });

  const handleChangeInputValues = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const onSubmitNameAndAddress = () => {
    if (inputValues.name === "" || inputValues.address === "") {
      Toast("error", "Some Fields are empty");
      return;
    }
    axios({
      method: "POST",
      url: "http://localhost:5000/marquee/add",
      data: {
        managerid: localStorage.getItem("beeid"),
        name: inputValues.name,
        address: inputValues.address,
        category: userEventCategory,
      },
    }).then((response) => {
      Toast("success", "Added Name and Address");
      history.push(`/add-${userEventCategory}/${response.data.result._id}`);
    });
  };
  return (
    <div className="container mt-5">
      <h3 className="text-center font-weight-bolder color-background-text">
        {userEventCategory.toUpperCase()} Details
      </h3>
      <div className="w-75 m-auto mt-5 d-flex justify-content-center align-items-center flex-column">
        <div className="my-2">
          <label className="mr-4">Enter the Name:</label>
          <input
            type="text"
            placeholder="Enter the Name"
            name="name"
            className="px-3 py-2 input-border"
            value={inputValues.name}
            onChange={handleChangeInputValues}
          />
        </div>
        <div className="my-2">
          <label className="mr-4">Enter the Address:</label>
          <input
            type="text"
            placeholder="Enter the address"
            name="address"
            className="px-3 py-2 input-border"
            value={inputValues.address}
            onChange={handleChangeInputValues}
          />
        </div>
        <div>
          <button className="btn btn-warning" onClick={onSubmitNameAndAddress}>
            Submit Name and Address
          </button>
        </div>
        {/* <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="h3 fw-bold my-4">Services</div>
          <div className="d-flex flex-wrap my-4 ">
            <li className="mx-2">
              service 1{" "}
              <small className="bg-danger px-2 text-light cursor-pointer">
                X
              </small>
            </li>
            <li className="mx-2">service 2</li>
            <li className="mx-2">service 3</li>
          </div>
          <div>
            <label className="mr-4">Enter Service: </label>
            <input
              type="text"
              placeholder="Enter the Service"
              name="service"
              className="px-3 py-2"
              value={inputValues.service}
              onChange={handleChangeInputValues}
            />
            <button className="btn btn-warning px-3 py-2 ml-2">ADD</button>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="h3 fw-bold my-4">Gallery</div>
          <div className="d-flex flex-wrap my-4 ">
            <li className="mx-2">
              service 1{" "}
              <small className="bg-danger px-2 text-light cursor-pointer">
                X
              </small>
            </li>
            <li className="mx-2">service 2</li>
            <li className="mx-2">service 3</li>
          </div>
          <div>
            <label className="mr-4">Upload Pic: </label>
            <input
              type="file"
              name="image"
              className="px-3 py-2"
              value={inputValues.image}
              onChange={handleChangeInputValues}
            />
            <button className="btn btn-warning px-3 py-2 ml-2">ADD</button>
          </div>
        </div> */}
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
    </div>
  );
}

export default Marquee;
