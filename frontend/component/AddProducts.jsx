import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

// Component for adding a new product
const AddProducts = () => {
  // State variables for form inputs
  const navigate = useNavigate();
  const [options, setOptions] = useState([]); // State for category options
  const [category, setCategory] = useState(""); // State for selected category
  const [productname, setProductName] = useState(""); // State for product name
  const [packsize, setPackSize] = useState(""); // State for pack size
  const [mrp, setMRP] = useState(""); // State for MRP
  const [status, setStatus] = useState(""); // State for product status

  // Fetch category options from backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3535/getallcategories");
        setOptions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  // Function to handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    // Form validation
    if (!category || !productname || !packsize || !mrp || !status) {
      alert("Please fill in all required fields.");
      return;
    }
    // Send POST request to backend to add new product
    axios.post("http://localhost:3535/product/addproduct", {
      category,
      productname,
      packsize,
      mrp,
      status,
    });
    // Navigate to products page after successful addition
    navigate("/products");
  };

  return (
    <>
      <div>
        <div className=" p-3 flex felx-row">
          <Link to="/products" className="p-2">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <div className=" p-2  font-semibold	">Add Product</div>
        </div>
        {/* Form for adding a new product */}
        <form onSubmit={handleSave} className="p-3  h-96">
          <div className="p-2 flex  justify-evenly space-x-4 ">
            {/* Dropdown for selecting category */}
            <select name="category" id="category-select" key="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Category</option>
              {/* Render category options */}
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* Input field for product name */}
            <label htmlFor="">
              <input type="text" value={productname} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" required />
            </label>
            {/* Input field for pack size */}
            <label htmlFor="">
              <input type="text" value={packsize} onChange={(e) => setPackSize(e.target.value)} placeholder="Pack Size" required />
            </label>
            {/* Input field for MRP */}
            <label htmlFor="">
              <input type="text" value={mrp} onChange={(e) => setMRP(e.target.value)} placeholder="MRP" required />
            </label>
            {/* Dropdown for selecting product status */}
            <label htmlFor="">
              <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>

          <div className="p-2 flex justify-end  content-end">
            {/* Button to cancel and navigate back to products page */}
            <Link to="/products">
              <button className="p-2 px-5 border-2 border-primary rounded-full font-semibold mr-2  ">Cancel</button>
            </Link>
            {/* Button to submit form and add product */}
            <button type="submit" className="p-2  w-20 font-semibold border rounded-full  bg-primary text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
