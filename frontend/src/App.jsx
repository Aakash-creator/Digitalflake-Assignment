import AddCategory from "../component/AddCategory";
import AddProducts from "../component/AddProducts";
import Layout from "../component/Layout";
import Sidebar from "../component/Sidebar";
import Category from "../pages/Category";
import Dashboard from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Products from "../pages/Products";
import SignIn from "../pages/SignIn";
import "./App.css";
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
            <Route path="/products" element={<Products />} />
            <Route path="/products/addproducts" element={<AddProducts />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
