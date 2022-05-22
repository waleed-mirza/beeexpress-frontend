import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Toast } from "./validationError/Checks";

const AddCategory = ({ checkflag, setCheckflag }) => {
  const [cat, setCat] = useState({
    category: "",
  });
  const [userId, setUserId] = useState(0);
  const [inputcheck, setInputcheck] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/checklogin", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.loggedIn === true) setUserId(res.data.id);
      });
  }, [inputcheck, checkflag]);
  const setCategory = (e) => {
    // setMenu({ ...menu, category: e.target.value });
    setCat({ category: e.target.value });
  };
  const categorySubmit = (e) => {
    e.preventDefault();

    if (cat.category) {
      const displayCategory = {
        category: cat.category,
        managerid: userId,
      };

      axios
        .post("http://localhost:5000/category/add", displayCategory)
        .then((res) => {
          Toast("category added successfully", "success");
          setCat({
            category: "",
          });
          setCheckflag(!checkflag);
          setInputcheck(!inputcheck);
          Toast("success", "Category Added");
        })
        .catch((response) => {
          Toast("error", "Server Error/Duplication value");
        });
    } else {
      Toast("error", "Enter the Category");
    }
  };
  return (
    <>
      <div className="category-section my-5 d-flex justify-content-center flex-column">
        <h1>Add category</h1>
        <form onSubmit={categorySubmit}>
          <div className="col-1">
            <div className="row-1">
              <div className="form-group">
                <label htmlFor="">Categories:</label>
                <input
                  className="py-2 px-3 input-border"
                  id="category"
                  type="text"
                  value={cat.category}
                  onChange={setCategory}
                />
              </div>
            </div>
            <input type="submit" VALUE="Submit" className="btn btn-warning" />
          </div>
        </form>
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
    </>
  );
};

export default AddCategory;
