// Import necessary modules
const { product } = require("../models/ProductModel");

// Function to get all product data
const getProductData = async (req, res) => {
  try {
    // Find all products
    const products = await product.find();
    console.log(product);
    if (products.length > 0) {
      // If products found, send products data as response
      res.json(products);
    } else {
      // If no products found, return message
      res.json("No products available");
    }
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get a single product item by ID
const getProductItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = await product.findById(productId);
    if (!productData) {
      // If product not found, return 404 error
      return res.status(404).json({ message: "Product not found" });
    }
    // Send product data as response
    res.json(productData);
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to add a new product
const addProduct = async (req, res) => {
  try {
    const { category, productname, packsize, mrp, status } = req.body;

    // Check if product with the same name already exists
    const existingProduct = await product.findOne({ productname });

    if (existingProduct) {
      // Product with the same name already exists, return an error response
      return res.status(409).json({ error: "Product with the same name already exists." });
    }

    // Create new product
    const newProduct = await product.create({ category, productname, packsize, mrp, status });

    // Send success message
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    // Handle duplicate key error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.productname === 1) {
      // Duplicate key error for productname field
      return;
    }
    // Handle any other errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a product item by ID
const deleteProductItem = async (req, res) => {
  try {
    const id = req.params.id;
    // Find and delete product item by ID
    await product.findByIdAndDelete(id);
    // Send success message
    res.json("Product deleted successfully");
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export functions for use in other modules
module.exports = { addProduct, getProductData, getProductItem, deleteProductItem };
