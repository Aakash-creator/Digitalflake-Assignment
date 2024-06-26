import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Component for editing a category
const EditCategory = () => {
  const { id } = useParams(); // Get category ID from URL params
  const [categoryname, setCategoryname] = useState(""); // State for category name
  const [description, setDescription] = useState(""); // State for category description
  const [status, setStatus] = useState(""); // State for category status
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update category
      await axios.put(`http://localhost:3535/category/${id}`, {
        categoryname,
        description,
        status,
      });
      navigate("/category"); // Navigate to the category page after successful update
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch category data from backend on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:3535/category/${id}`)
      .then((res) => {
        // Update state with fetched category data
        const { categoryname, description, status } = res.data;
        setCategoryname(categoryname);
        setDescription(description);
        setStatus(status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <div>
        <div className="p-3 flex felx-row">
          {/* Link to navigate back to category page */}
          <Link to="/category" className="p-2">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <div className="p-2 font-semibold">Edit Category</div>
        </div>
        {/* Form for editing category */}
        <form onSubmit={handleSubmit} className="p-3 h-96">
          <div className="p-2 flex justify-evenly space-x-4 ">
            {/* Input field for category name */}
            <label htmlFor="">
              <input type="text" name="categoryname" value={categoryname} onChange={(e) => setCategoryname(e.target.value)} placeholder="Category Name" required />
            </label>
            {/* Input field for category description */}
            <label htmlFor="">
              <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
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
            {/* Button to submit form and save changes */}
            <button type="submit" className="p-2 w-20 font-semibold border rounded-full bg-primary text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
