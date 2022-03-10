import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
  }, [inputcheck]);
  const setCategory = (e) => {
    // setMenu({ ...menu, category: e.target.value });
    setCat({ category: e.target.value });
  };
  const categorySubmit = (e) => {
    e.preventDefault();
    const displayCategory = {
      category: cat.category,
      managerid: userId,
    };

    console.log(displayCategory);
    // window.location = "/";
    axios
      .post("http://localhost:5000/category/add", displayCategory)
      .then((res) => {
        console.log(res.data);
        setCat({
          category: "",
        });
        setCheckflag(!checkflag);
        setInputcheck(!inputcheck);
      });
  };
  return (
    <>
      <div className="category-section">
        <h1>Add categ</h1>
        <form onSubmit={categorySubmit}>
          <div className="col-1">
            <div className="row-1">
              <div className="form-group">
                <label htmlFor="">Categories:</label>
                <input
                  id="category"
                  type="text"
                  VALUE={cat.category}
                  onChange={setCategory}
                />
              </div>
            </div>
            <input type="submit" VALUE="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
