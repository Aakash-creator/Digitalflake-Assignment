import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddProducts = () => {
  const [options, setOptions] = useState([]);

  const [category, setCategory] = useState("");
  const [productname, setProductName] = useState("");
  const [packsize, setPackSize] = useState("");
  const [mrp, setMRP] = useState("");
  // const [productImage, setProductImage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3535/getallcategories");
        setOptions(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    // Form validation
    if (!category || !productname || !packsize || !mrp || !status) {
      alert("Please fill in all required fields.");
      return;
    }

    // Send POST request to backend
    axios.post("http://localhost:3535/product/addproduct", {
      category,
      productname,
      packsize,
      mrp,
      status,
    });
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
        <form onSubmit={handleSave} className="p-3">
          <div className="p-2 flex  justify-evenly space-x-4 ">
            <select name="category" id="category-select" key="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Category</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="">
              <input type="text" value={productname} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" required />
            </label>
            <label htmlFor="">
              <input type="text" value={packsize} onChange={(e) => setPackSize(e.target.value)} placeholder="Pack Size" required />
            </label>
            <label htmlFor="">
              <input type="text" value={mrp} onChange={(e) => setMRP(e.target.value)} placeholder="MRP" required />
            </label>
            <label htmlFor="">
              <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>

          <div className="p-2 flex justify-end ">
            <button type="submit" className="p-2 border rounded-lg mr-2 ">
              Save
            </button>
            <Link to="/products">
              <button className="p-2 px-5 border rounded-lg">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
