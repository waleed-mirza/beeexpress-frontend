import React from "react";
import { useHistory } from "react-router-dom";

function VenueDetails({ userEventCategory, marqueeDetails }) {
  const history = useHistory();

  return (
    <div className="my-5 container">
      <ul class="list-group">
        {marqueeDetails?.map((val, index) => {
          return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {val.name} {val.address}
              <span
                className="badge badge-primary badge-pill venue-detail-list-item"
                onClick={() => {
                  history.push(`/add-${userEventCategory}/${val._id}`);
                }}
              >
                Update
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default VenueDetails;
