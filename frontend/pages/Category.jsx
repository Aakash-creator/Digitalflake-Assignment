import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3535/category")
      .then((dt) => {
        setdata(dt.data);
        console.log(dt.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-around my-5">
          <div>category</div>
          <div>
            <input type="text" placeholder="Search" className=" rounded-md border-2" />
          </div>
          <div>
            {/* can also use onclick with useNavigate or Link form react router dom  */}
            <Link to="/category/addcategory">
              <button> Add New</button>
            </Link>
          </div>
        </div>
        <div className="  my-5 d-flex  bg-primary justify-content-center align-item-center">
          <div className="  justify-evenly   flex w-full bg-white rounded p-3">
            <table className="  justify-evenly table-auto">
              <thead className=" w-screen">
                <tr className="">
                  <th className="  px-10">ID</th>
                  <th className="  px-10  ">Name</th>
                  <th className="  px-10  ">Description</th>
                  <th className="  px-10  ">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((dt, i) => (
                  <tr key={i}>
                    <td className="  px-10  ">{dt._id}</td>
                    <td className="  px-10  ">{dt.categoryname}</td>
                    <td className="  px-10  ">{dt.description}</td>
                    <td className="  px-10  ">{dt.status}</td>
                    <td>
                      <Link to={`/category/editcategory/${dt._id}`}>Edit</Link>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Category;
