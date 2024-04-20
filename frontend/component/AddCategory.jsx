import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const [categoryname, setCategoryname] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();

  const handelsubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:3535/category/addcategory", { categoryname, description, status }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <div>
        <div>
          <Link to="/category">Back</Link>
          Add Category
        </div>
        <form onSubmit={handelsubmit}>
          <div>
            <label htmlFor="">
              <input
                type="text"
                name="categoryname"
                onChange={(e) => {
                  setCategoryname(e.target.value);
                }}
                placeholder="Category Name"
              />
            </label>
            <label htmlFor="">
              <input
                type="text"
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Description"
              />
            </label>
            <label htmlFor="">
              <select
                name="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                id=""
              >
                <option value="Null">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <div>
              <button type="submit">Save</button>
              <button>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
