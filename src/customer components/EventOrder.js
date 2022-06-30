import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { Toast } from "./validationError/Checks";
import axios from "axios";
import { REQ_URL } from "../CONSTANTS";
import { useHistory } from "react-router-dom";

import OrderDetails from "./UI'S/OrderDetails";
import { EventBg } from "./BackgroundImage";

function EventOrder({
  setInOrderDetail = function() {},
  orderId,
  onOrderCreation,
}) {
  const history = useHistory();
  const { id } = useParams();
  // const id = orderId;
  const [dateValue, setDateValue] = useState(new Date());
  const [orderDetails, setOrderDetails] = useState({});
  const [renderCheck, setRenderCheck] = useState(false);

  const [inputValues, setInputValues] = useState({
    noofpersons: "",
    eventtype: "",
    eventdate: new Date(),
  });

  const handleChangeInputValues = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    setInOrderDetail({ ...inputValues, [name]: value });
  };
  useEffect(() => {
    console.log(dateValue, "date check outer yoooorw");
    axios({
      method: "POST",
      url: `${REQ_URL}eventorder/getorders`,
      data: {
        filter: "",
        userid: "",
        orderid: id,
      },
    }).then((response) => {
      if (response.data.result.length && response.data.result[0].noofpersons) {
        setOrderDetails(response.data.result[0]);
        setInputValues({
          ...inputValues,
          noofpersons: response.data.result[0].noofpersons,
          eventtype: response.data.result[0].eventtype,
          eventdate: response.data.result[0].eventdate,
        });

        setInOrderDetail({
          ...inputValues,
          noofpersons: response.data.result[0].noofpersons,
          eventtype: response.data.result[0].eventtype,
        });

        setDateValue(new Date(response.data.result[0].eventdate));
        setInOrderDetail({
          ...inputValues,
          eventdate: new Date(response.data.result[0].eventdate),
        });
      } else {
        setInputValues({
          noofpersons: "",
          eventtype: "",
          eventdate: new Date(),
        });
        setInOrderDetail({});
        setDateValue(new Date());
        setInOrderDetail({ ...inputValues, eventdate: new Date() });
      }
    });
  }, [id, renderCheck]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputValues.noofpersons && inputValues.eventtype && dateValue) {
      console.log(id, "order id");
      setInOrderDetail({
        noofpersons: inputValues.noofpersons,
        eventtype: inputValues.eventtype,
        eventdate: dateValue,
      });
      axios({
        method: "POST",
        url: `${REQ_URL}eventorder/update`,
        data: {
          noofpersons: inputValues.noofpersons,
          eventtype: inputValues.eventtype,
          eventdate: dateValue,
          orderid: id,
        },
      }).then((response) => {
        setRenderCheck(!renderCheck);
        Toast("success", response.data.message);
      });
    } else {
      Toast("error", "Some Fields are empty");
    }
  };
  return (
    <div className="container my-5 text-over-bg">
      <EventBg />
      <h3 className="text-center my-3 font-weight-bold">
        Complete Booking Details
      </h3>

      <div className="form-container w-75 e-further-data">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">No of Persons</label>
            <input
              type="number"
              name="noofpersons"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Number Of People"
              onChange={handleChangeInputValues}
              value={inputValues.noofpersons}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput2">
              Select Date and Time For Event
            </label>
            <DateTimePicker
              onChange={(val) => {
                setDateValue(val);
                setInOrderDetail({ ...inputValues, eventdate: val });
                console.log(val, "datetimevalue1");
              }}
              // onChange={setDateValue}
              value={dateValue}
              name="datetime"
              className="form-control"
              id="exampleFormControlInput2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">
              Select Event type here. (If not present Select other)
            </label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              name="eventtype"
              value={inputValues.eventtype}
              onChange={handleChangeInputValues}
            >
              <option value=""></option>
              <option value="Seminar">Seminar</option>
              <option value="Party">Party</option>
              <option value="Marriage">Marriage</option>
              <option value="other">other</option>
            </select>
          </div>
          {!history.location.pathname.includes("marquee") && (
            <button type="submit" className="btn btn-warning">
              Submit
            </button>
          )}
        </form>
      </div>
      {history.location.pathname.includes("marquee") && (
        <div className="book-now-btn">
          {/* <Link to="/checkout"> */}
          <button className="button-style my-5" onClick={onOrderCreation}>
            Book Now
          </button>
          {/* </Link> */}
        </div>
      )}
      <OrderDetails
        userid={localStorage.getItem("beeid")}
        filter=""
        renderCheck={renderCheck}
        userRole="customer"
      />
    </div>
  );
}

export default EventOrder;
