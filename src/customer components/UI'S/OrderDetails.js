import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { REQ_URL } from "../../CONSTANTS";
import { Toast } from "../validationError/Checks";

function OrderDetails({ userid, filter, userRole, renderCheck, managerid }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [filterValue, setFilterValue] = useState(filter);
  const [deleteRenderCheck, setDeleteRenderCheck] = useState(false);
  const [marqueeDetails, setMarqueeDetails] = useState([]);
  const isManager = userRole === "manager" ? true : false;
  const isAdmin = userRole === "admin" ? true : false;
  const isCustomer = userRole === "customer" ? true : false;
  const history = useHistory();
  useEffect(() => {
    axios({
      method: "GET",
      url: `${REQ_URL}marquee/getall`,
    }).then((response) => {
      setMarqueeDetails(response.data.result);
    });
    console.log(filterValue, "filter");
    axios({
      method: "POST",
      url: `${REQ_URL}eventorder/getorders`,
      data: {
        userid: userid,
        filter: filterValue,
        managerid: managerid,
      },
    }).then((response) => {
      console.log(response.data.result);
      setOrderDetails(response.data.result);
    });
  }, [renderCheck, deleteRenderCheck]);
  const onDeleteOrder = (id) => {
    axios({
      method: "POST",
      url: `${REQ_URL}eventorder/delete`,
      data: {
        orderid: id,
      },
    }).then((response) => {
      Toast("success", response.data.message);
      setDeleteRenderCheck(!deleteRenderCheck);
    });
  };
  const getPlaceName = (id) => {
    const res = marqueeDetails?.find((x) => x._id === id)?.name;
    return res?.toUpperCase();
  };
  const ChangeStatus = (id, status) => {
    axios({
      method: "POST",
      url: `${REQ_URL}eventorder/change-status`,
      data: {
        orderid: id,
        orderstatus: status,
      },
    }).then((response) => {
      Toast("success", "Changed successfully");
      setDeleteRenderCheck(!deleteRenderCheck);
    });
  };
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setDeleteRenderCheck(!deleteRenderCheck);
  };
  return (
    <div className="my-5 container table-responsive">
      <div className="w-75 mx-auto">
        <h3 className="text-center my-3 font-weight-bold">
          Event Order Details
        </h3>

        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Select Filter</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              name="filter"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <option value="" default>
                Select Filter here
              </option>
              <option value="pending">Pending</option>
              <option value="approve">Approve</option>
              <option value="">All</option>
            </select>
          </div>
        </form>
      </div>

      {!orderDetails?.length && (
        <div className="my-4 font-weight-bold text-center">No Orders Yet</div>
      )}
      <table className="table table-striped my-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Place</th>
            <th scope="col">Name</th>
            <th scope="col">Event</th>
            <th scope="col">Persons</th>
            <th scope="col">Date</th>
            <th scope="col">Location</th>
            <th scope="col">Status</th>
            {(isCustomer || isAdmin) && <th scope="col">(Update)</th>}
            {(isAdmin || isCustomer) && <th scope="col">(Delete)</th>}
            {(isManager || isAdmin) && <th scope="col">Action</th>}
          </tr>
        </thead>
        <tbody>
          {orderDetails?.map((val, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{val.placetype?.toUpperCase()}</td>
                <td>{getPlaceName(val.placeid)}</td>
                <td>{val.eventtype}</td>
                <td>{val.noofpersons}</td>
                {/* <td>{val.eventdate?.replace("T", " ")}</td> */}
                <td>{new Date(val.eventdate).toString().split("GMT+")[0]}</td>
                <td>{val.eventlocation}</td>
                <td>{val.orderstatus}</td>
                {(isCustomer || isAdmin) && (
                  <td
                    className="text-center row-action"
                    onClick={() => {
                      history.push(`/event-order/${val._id}`);
                    }}
                  >
                    Update
                  </td>
                )}
                {(isCustomer || isAdmin) && (
                  <td
                    className="text-center row-action"
                    onClick={() => {
                      if (val.orderstatus === "pending") onDeleteOrder(val._id);
                      else {
                        Toast("error", "Can't Delete this order");
                      }
                    }}
                  >
                    Delete
                  </td>
                )}

                {(isManager || isAdmin) && (
                  <td
                    className="text-center row-action"
                    onClick={() => {
                      val.orderstatus === "pending"
                        ? ChangeStatus(val._id, "approve")
                        : ChangeStatus(val._id, "pending");
                    }}
                  >
                    {val.orderstatus === "pending" ? "Approve" : "Disapprove"}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
