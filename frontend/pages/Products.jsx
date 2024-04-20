import { Link, Outlet } from "react-router-dom";

const Products = () => {
  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="flex justify-around ">
            <div>Product</div>
            <div>
              <input type="text" placeholder="Search" className=" rounded-md border-2" />
            </div>
            <div>
              {/* can also use onclick with useNavigate or Link form react router dom  */}
              <Link to="/products/addproducts">
                <button> Add New</button>
              </Link>
            </div>
          </div>
          <div>table</div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Products;
