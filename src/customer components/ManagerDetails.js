import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { REQ_URL } from "../CONSTANTS";
import { Toast } from "./validationError/Checks";

function ManagerDetails({ userid, filter, userRole, renderCheck, managerid }) {
  const [profileData, setProfileData] = useState([]);
  const [filterValue, setFilterValue] = useState(filter);
  const [deleteRenderCheck, setDeleteRenderCheck] = useState(false);
  const isManager = userRole === "manager" ? true : false;
  const isAdmin = userRole === "admin" ? true : false;
  const isCustomer = userRole === "customer" ? true : false;
  const history = useHistory();
  useEffect(() => {
    axios({
      method: "POST",
      url: `${REQ_URL}auth/getprofile`,
      data: {
        userId: userid,
        userrole: "manager",
        filter: filterValue,
      },
    }).then((response) => {
      console.log(response.data.result);
      setProfileData(response.data.result);
    });
  }, [renderCheck, deleteRenderCheck]);

  const ChangeStatus = (id, status) => {
    axios({
      method: "POST",
      url: `${REQ_URL}auth/updatestatus`,
      data: {
        userid: id,
        status: status,
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

      <h3 className="text-center my-3 font-weight-bold">Manager Details</h3>
      {!profileData?.length && (
        <div className="my-4 font-weight-bold text-center">No Manager Yet</div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">CNIC</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            {isAdmin && <th scope="col">Action</th>}
          </tr>
        </thead>
        <tbody>
          {profileData?.map((val, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{val.email}</td>
                <td>{val.name}</td>
                <td>{val.CNIC}</td>
                <td>{val.userrole}</td>
                <td>{val.status}</td>

                {isAdmin && (
                  <td
                    className="text-center row-action"
                    onClick={() => {
                      val.status === "pending"
                        ? ChangeStatus(val._id, "approve")
                        : ChangeStatus(val._id, "pending");
                    }}
                  >
                    {val.status === "pending" ? "Approve" : "Disapprove"}
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

export default ManagerDetails;
