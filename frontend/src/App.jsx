import AddCategory from "../component/AddCategory";
import AddProducts from "../component/AddProducts";
import EditCategory from "../component/EditCategory";
import EditProduct from "../component/EditProduct";
import Layout from "../component/Layout";
import Sidebar from "../component/Sidebar";
import Category from "../pages/Category";
import Dashboard from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Products from "../pages/Products";
import ResetPassword from "../pages/ResetPassword";
import SignIn from "../pages/SignIn";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route element={<Sidebar />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/addcategory" element={<AddCategory />} />
            <Route path="/category/addcategory" element={<AddCategory />} />
            <Route path="/category/editcategory/:id" element={<EditCategory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/addproducts" element={<AddProducts />} />
            <Route path="/products/addproducts/:id" element={<EditProduct />} />
          </Route>
        </Route>
        <Route path="/resetpassword/${admin._id}/${token}" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
