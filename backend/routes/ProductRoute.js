const express = require("express");
const router = express.Router();
const { addProduct, getProductData, getProductItem, deleteProductItem, getAllActiveProducts } = require("../controller/ProductController");

// Route to test if product router is working
router.get("/working", (req, res) => {
  res.json("working");
});

// Route to get all products data
router.get("/product", getProductData);

// Route to get a single product item by ID
router.get("/product/:id", getProductItem);

// Route to add a new product
router.post("/product/addproduct", addProduct);

// Route to edit product by ID
router.get("/product/editproduct/:id", getProductItem);

// Route to delete product by ID
router.post("/product/deleteproduct/:id", deleteProductItem);

// Route to get all active products
// router.get("/getallproducts", getAllActiveProducts);

// Export router for use in other modules
module.exports = router;
