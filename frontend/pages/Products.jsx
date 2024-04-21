import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [data, setdata] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const handelDelete = (_id) => {
    try {
      axios
        .post(`http://localhost:3535/product/deleteproduct/${_id}`)
        .then((res) => {
          console.log(res.data);
          // Remove the item from the UI after successful deletion
          setdata(data.filter((item) => item._id !== _id));
          setDeleteId(null); // Reset deleteId after deletion
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3535/product")
      .then((dt) => {
        setdata(dt.data);
        // console.log(dt.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setdata]);

  const confirmDelete = () => {
    handelDelete(deleteId);
  };

  const openDialog = (_id) => {
    setDeleteId(_id);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-around my-5">
          <div>Products</div>
          <div>
            <input type="text" placeholder="Search" className=" rounded-md border-2" />
          </div>
          <div>
            <Link to="/products/addproducts" className=" p-2 px-4 font-semibold border rounded-full  bg-primary text-white">
              <button>Add New</button>
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
                  <th className="  w-10">Pack Size</th>
                  <th className="  px-10  ">Category</th>
                  <th className="  px-10  ">MRP</th>
                  <th className="  px-10  ">Images</th>
                  <th className="  px-10  ">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((dt, i) => (
                  <tr key={i}>
                    <td className="  px-10  wx-auto">{dt._id}</td>
                    <td className="  px-10  ">{dt.productname}</td>
                    <td className=" px-10  ">{dt.packsize}</td>
                    <td className="  px-10  ">{dt.category}</td>
                    <td className="  px-10  ">{dt.mrp}</td>
                    <td className="  px-10  ">Images</td>
                    <td className="  px-10  ">{dt.status}</td>
                    <td>
                      <Link to={`/products/addproducts/${dt._id}`}>
                        <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                      </Link>
                    </td>
                    <td>
                      <button
                        className="ml-2"
                        // onClick={() => {
                        //   handelDelete(dt._id);
                        // }}
                        onClick={() => openDialog(dt._id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} size="lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {deleteId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 ">
          <div className="bg-white p-5 rounded w-80">
            <div className="flex flex-row justify-center mt-3  mb-3">
              <FontAwesomeIcon icon={faTriangleExclamation} size="2xl" style={{ color: "#e40609" }} />
              <p className="  justify-center pt-1 ml-3  font-semibold  text-lg">Delete</p>
            </div>
            <p className="flex flex-row justify-center mt-3  mb-3">Are you sure you want to delete?</p>
            <div className="flex justify-center  mt-10 ">
              <button className="mr-3 bg-white px-4 py-2 border-2 border-primary rounded-full" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className=" bg-primary text-white px-4 py-2 rounded-full" onClick={confirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Products;
