const express = require("express");
const router = express.Router();
const { addCategory, getCategoryData, getCategoryItem, deleteCategoryItem, getAllActiveCategories } = require("../controller/CategoryController");

// Route to get all categories data
router.get("/category", getCategoryData);

// Route to get a single category item by ID
router.get("/category/:id", getCategoryData);

// Route to add a new category
router.post("/category/addcategory", addCategory);

// Route to edit category by ID
router.get("/category/editcategory/:id", getCategoryItem);

// Route to delete category by ID
router.post("/category/deletecategory/:id", deleteCategoryItem);

// Route to get all active categories
router.get("/getallcategories", getAllActiveCategories);

// Export router for use in other modules
module.exports = router;
