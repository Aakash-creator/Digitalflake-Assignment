import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Component for adding a new category
const AddCategory = () => {
  const [categoryname, setCategoryname] = useState(""); // State for category name
  const [description, setDescription] = useState(""); // State for category description
  const [status, setStatus] = useState(""); // State for category status
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (!categoryname || !description || !status) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      // Send POST request to add category
      await axios.post("http://localhost:3535/category/addcategory", {
        categoryname,
        description,
        status,
      });
      // Display success message and navigate to category page
      alert("Category added successfully");
      navigate("/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="p-3 flex felx-row">
          {/* Link to navigate back to category page */}
          <Link to="/category" className="p-2">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <div className="p-2 font-semibold">Add Category</div>
        </div>
        {/* Form for adding a new category */}
        <form onSubmit={handleSubmit} className="p-3 h-96">
          <div className="p-2 flex justify-evenly space-x-4">
            {/* Input field for category name */}
            <label htmlFor="">
              <input type="text" value={categoryname} onChange={(e) => setCategoryname(e.target.value)} placeholder="Category Name" required />
            </label>
            {/* Input field for category description */}
            <label htmlFor="">
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            </label>
            {/* Dropdown for category status */}
            <label htmlFor="">
              <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>

          <div className="p-2 flex justify-end content-end">
            {/* Button to cancel and navigate back to category page */}
            <Link to="/category">
              <button className="p-2 px-5 border-2 border-primary rounded-full font-semibold mr-2">Cancel</button>
            </Link>
            {/* Button to submit form and add category */}
            <button type="submit" className="p-2 w-20 font-semibold border rounded-full bg-primary text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
