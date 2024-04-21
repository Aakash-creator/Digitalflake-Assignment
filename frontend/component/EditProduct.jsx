import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Component for editing a product
const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [categoryname, setCategoryname] = useState(""); // State for category name
  const [description, setDescription] = useState(""); // State for product description
  const [packsize, setPackSize] = useState(""); // State for pack size
  const [mrp, setMRP] = useState(""); // State for MRP
  const [status, setStatus] = useState(""); // State for product status
  const navigate = useNavigate(); // Access navigate function from useNavigate hook

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update product
      await axios.put(`http://localhost:3535/product/${id}`, {
        categoryname,
        description,
        packsize,
        mrp,
        status,
      });
      // Navigate to the products page after successful update
      navigate("/products"); // Use navigate instead of history.push
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch product data from backend on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:3535/product/${id}`) // Assuming your endpoint to fetch a single product details is "/product/:id"
      .then((res) => {
        // Update state with fetched product data
        const { categoryname, description, packsize, mrp, status } = res.data;
        setCategoryname(categoryname);
        setDescription(description);
        setPackSize(packsize);
        setMRP(mrp);
        setStatus(status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Dependency array to re-fetch data when ID changes

  return (
    <>
      <div>
        <div className="p-3 flex felx-row">
          {/* Link to navigate back to products page */}
          <Link to="/products" className="p-2">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <div className="p-2 font-semibold">Edit Product</div>
        </div>
        {/* Form for editing product */}
        <form onSubmit={handleSubmit} className="p-3 h-96">
          <div className="p-2 flex justify-evenly space-x-4 ">
            {/* Input field for category name */}
            <label htmlFor="">
              <input type="text" name="categoryname" value={categoryname} onChange={(e) => setCategoryname(e.target.value)} placeholder="Category Name" required />
            </label>
            {/* Input field for product description */}
            <label htmlFor="">
              <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            </label>
            {/* Input field for pack size */}
            <label htmlFor="">
              <input type="text" name="packsize" value={packsize} onChange={(e) => setPackSize(e.target.value)} placeholder="Pack Size" required />
            </label>
            {/* Input field for MRP */}
            <label htmlFor="">
              <input type="text" name="mrp" value={mrp} onChange={(e) => setMRP(e.target.value)} placeholder="MRP" required />
            </label>
            {/* Dropdown for product status */}
            <label htmlFor="">
              <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>

          <div className="p-2 flex justify-end content-end">
            {/* Button to cancel and navigate back to products page */}
            <Link to="/products">
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

export default EditProduct;
