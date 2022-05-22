import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toast } from "../validationError/Checks";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function UpdateMarquee({ userEventCategory, id }) {
  const history = useHistory();
  const fileRef = useRef(null);
  const [marqueeDetails, setMarqueeDetails] = useState({});
  const [renderCheck, setRenderCheck] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    service: "",
    image: "",
  });
  useEffect(() => {
    axios({
      mehtod: "GET",
      url: "http://localhost:5000/marquee/getbyid",
      params: {
        managerid: localStorage.getItem("beeid"),
        marqueeid: id,
      },
    }).then((response) => {
      setMarqueeDetails(response.data.result[0]);
    });
  }, [renderCheck]);
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
      url: "http://localhost:5000/marquee/update",
      data: {
        managerid: localStorage.getItem("beeid"),
        marqueeid: id,
        name: inputValues.name,
        address: inputValues.address,
      },
    }).then((response) => {
      Toast("success", "Updated Name and Address");
      setRenderCheck(!renderCheck);
    });
  };
  const onSubmitService = () => {
    if (inputValues.service === "") {
      Toast("error", "Some Fields are empty");
      return;
    }
    let servicesToPush = marqueeDetails?.services;
    servicesToPush?.push(inputValues.service);
    axios({
      method: "POST",
      url: "http://localhost:5000/marquee/updateservices",
      data: {
        managerid: localStorage.getItem("beeid"),
        marqueeid: id,
        services: servicesToPush,
      },
    }).then((response) => {
      Toast("success", "Updated Services");
      setMarqueeDetails({
        ...marqueeDetails,
        services: servicesToPush,
      });
      setInputValues({ ...inputValues, service: "" });
      setRenderCheck(!renderCheck);
    });
  };
  const onDeleteService = (index) => {
    let servicesToPush = marqueeDetails.services.filter(
      (x) => x !== marqueeDetails.services[index]
    );

    axios({
      method: "POST",
      url: "http://localhost:5000/marquee/updateservices",
      data: {
        managerid: localStorage.getItem("beeid"),
        marqueeid: id,
        services: servicesToPush,
      },
    }).then((response) => {
      Toast("success", "Deleted Service");
      setMarqueeDetails({
        ...marqueeDetails,
        services: servicesToPush,
      });
      setRenderCheck(!renderCheck);
    });
  };
  const onSubmitFile = () => {
    if (inputValues.image === "") {
      Toast("error", "Some Fields are empty");
      return;
    }
    let formData = new FormData();
    formData.append("file", inputValues.image);
    formData.append("marqueeid", id);
    formData.append("managerid", localStorage.getItem("beeid"));
    formData.append("images", JSON.stringify(marqueeDetails?.images));
    axios({
      method: "POST",
      url: "http://localhost:5000/marquee/updateimages",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      Toast("success", "Updated Images");
      setMarqueeDetails({
        ...marqueeDetails,
        images: response.data.result.images,
      });
      setInputValues({ ...inputValues, image: "" });
      fileRef.current.value = "";
      setRenderCheck(!renderCheck);
    });
  };
  const onDeleteImage = (index) => {
    let imagesToPush = marqueeDetails.images.filter(
      (x) => x !== marqueeDetails.images[index]
    );

    axios({
      method: "POST",
      url: "http://localhost:5000/marquee/deleteimage",
      data: {
        managerid: localStorage.getItem("beeid"),
        marqueeid: id,
        images: JSON.stringify(imagesToPush),
        imageurl: marqueeDetails.images[index],
      },
    }).then((response) => {
      Toast("success", "Deleted Service");
      setMarqueeDetails({
        ...marqueeDetails,
        images: imagesToPush,
      });
      setRenderCheck(!renderCheck);
    });
  };
  const onFileInputChange = (e) => {
    setInputValues({ ...inputValues, image: e.target.files[0] });
  };
  return (
    <div className="container mt-5">
      <h3 className="text-center font-weight-bolder color-background-text">
        {userEventCategory.toUpperCase()} Details
      </h3>
      {marqueeDetails && (
        <div className="d-flex justify-content-center align-items-center flex-column my-4">
          <div>
            <b>Name: </b>
            {marqueeDetails.name}
          </div>
          <div>
            <b>Address: </b>
            {marqueeDetails.address}
          </div>
        </div>
      )}

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
        <div className="my-2">
          <button className="btn btn-warning" onClick={onSubmitNameAndAddress}>
            Update Name and Address
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="h3 fw-bold my-4 color-background-text">Services</div>
          <div className="d-flex flex-wrap my-4 ">
            {marqueeDetails?.services?.map((val, index) => {
              return (
                <li className="mx-2" key={index}>
                  {val}
                  <small
                    className="bg-danger px-2 text-light cursor-pointer mx-2"
                    onClick={() => onDeleteService(index)}
                  >
                    X
                  </small>
                </li>
              );
            })}
            {marqueeDetails?.services && !marqueeDetails.services.length && (
              <p>No Data Yet</p>
            )}
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
            <button
              className="btn btn-warning px-3 py-2 ml-2"
              onClick={onSubmitService}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="my-4">
            <label className="mr-4">Upload Pic: </label>
            <input
              type="file"
              name="image"
              className="px-3 py-2"
              onChange={onFileInputChange}
              ref={fileRef}
            />
            <button
              className="btn btn-warning px-3 py-2 ml-2"
              onClick={onSubmitFile}
            >
              ADD
            </button>
          </div>
          <div className="d-flex flex-wrap my-4">
            <div className="marquee-gallery">
              <h1 className="color-background-text">Venue Gallery</h1>
              <div className="marquee-images">
                {marqueeDetails?.images?.map((val, index) => {
                  return (
                    <div width="350px" className="position-relative">
                      <img
                        src={val}
                        alt="vanue image here"
                        className="img-fluid"
                      />
                      <div
                        className="delete-img-btn"
                        onClick={(index) => onDeleteImage(index)}
                      >
                        X
                      </div>
                    </div>
                  );
                })}
                {marqueeDetails?.images && !marqueeDetails.images.length && (
                  <p>No Data Yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </div>
  );
}

export default UpdateMarquee;
