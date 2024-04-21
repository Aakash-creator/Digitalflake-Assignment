// Import necessary modules
const { category } = require("../models/CategoryModel");

// Function to get all categories data
const getCategoryData = async (req, res) => {
  try {
    // Find all categories
    const isThere = await category.find();
    console.log(isThere);

    // Send categories data as response
    res.json(isThere);
  } catch (error) {
    // Handle any errors
    console.log(error);
  }
};

// Function to get a single category item by ID
const getCategoryItem = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = await category.findById(categoryId);
    if (!categoryData) {
      // If category not found, return 404 error
      return res.status(404).json({ message: "Category not found" });
    }
    // Send category data as response
    res.json(categoryData);
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to add a new category
const addCategory = async (req, res) => {
  try {
    const { categoryname, description, status } = req.body;

    if (categoryname && description && status) {
      // Create new category
      const data = category.create({ categoryname, description, status }).then((dt) => {
        console.log(dt);
        res.json("category added successfully");
      });
    } else {
      // If any required fields are missing, return error
      res.json("Enter valid input");
    }
  } catch (error) {
    // Handle any errors
    console.log(error);
  }
};

// Function to delete a category item by ID
const deleteCategoryItem = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    // Find and delete category item by ID
    await category.findByIdAndDelete(id).then(() => {
      res.json("Item deleted successfully");
    });
  } catch (error) {
    // Handle any errors
    console.log(error);
  }
};

// Function to get all active categories
const getAllActiveCategories = async (req, res) => {
  try {
    // Find all active categories and select only categoryname field
    const activeCategories = await category.find({ status: "Active" }, "categoryname").select("categoryname").lean(); // Convert documents to plain JavaScript objects

    const activeCategoryNames = activeCategories.map((category) => category.categoryname);

    console.log("Active Categories:", activeCategoryNames);

    if (activeCategoryNames.length === 0) {
      // If no active categories found, return message
      res.json({ message: "No active categories found." });
    } else {
      // Send active category names as response
      res.json(activeCategoryNames);
    }
  } catch (error) {
    // Handle any errors
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export functions for use in other modules
module.exports = { addCategory, getCategoryData, getCategoryItem, deleteCategoryItem, getAllActiveCategories };
