const express = require("express");

const app = express();

// Load environment variables from .env file
require("dotenv").config();

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
app.use(cors());

// Connect to the database
require("./DBConnect");

// Parse cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Import routes
const auth = require("./routes/AuthRoutes");
const category = require("./routes/CategoryRoute");
const product = require("./routes/ProductRoute");

// Middleware for parsing JSON bodies
app.use(express.json());

// Route for homepage
app.get("/home", (req, res) => {
  res.send("Hello digitalflake!");
});

// Authentication registration routes middleware
app.use(auth);

// Routes middleware for category
app.use(category);

// Routes middleware for products
app.use(product);

// Route for handling undefined routes
app.get("*", (req, res) => {
  res.status(404).send("Resource you are finding is not available!");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
