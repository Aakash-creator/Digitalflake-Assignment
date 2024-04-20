import { Link } from "react-router-dom";

const AddProducts = () => {
  return (
    <>
      <div>
        <div>
          <Link to="/products">Back</Link>
          Add Product
        </div>
        <div>
          <label htmlFor="">
            <select name="" id="">
              <option value="">Category</option>;
            </select>
            {/* dynamically render options from backend  */}
          </label>

          <label htmlFor="">
            <input type="text" placeholder="Product Name" />
          </label>

          <label htmlFor="">
            <input type="text" placeholder="Pack Size" />
          </label>

          <label htmlFor="">
            <input type="text" placeholder="MRP" />
          </label>

          <label htmlFor="">
            <input type="text" placeholder="Product Image" />
          </label>

          <label htmlFor="">
            <select name="status" id="">
              <option value="Null">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
