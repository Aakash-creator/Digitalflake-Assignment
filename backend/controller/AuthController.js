// Import necessary modules
const { Authadmin } = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Function to log in admin users and provide JWT tokens
const loginAdmin = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find admin user by email
    const isThere = await Authadmin.findOne({ email });

    // If admin user does not exist, return error
    if (!isThere) {
      return res.status(400).json({ error: "Admin does not exist, register admin before trying" });
    }

    // If admin user exists, check password
    if (isThere.email === email) {
      const passwordMatch = await bcrypt.compare(password, isThere.password);
      if (passwordMatch) {
        // If password matches, generate JWT tokens
        const userId = isThere._id;
        const accesstoken = JWT.sign({ email, userId }, process.env.JWTACCESSTOKENSECRET, {
          expiresIn: "10h",
        });
        const refreshtoken = JWT.sign({ email, userId }, process.env.JWTREFRESHTOKENSECRET, {
          expiresIn: "12h",
        });

        // Set cookies with JWT tokens
        res.cookie("accesstoken", accesstoken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });

        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });

        // Return success message
        return res.status(200).json({ message: "Login Successful!" });
      } else {
        // If password doesn't match, return error
        return res.status(401).json({ error: "Incorrect Credentials" });
      }
    }
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Function to register a new admin user
const registerAdmin = async (req, res) => {
  try {
    // Extract name, email, and password from request body
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (name && email && password) {
      // Check if admin user already exists with provided email
      const isThere = await admin.findOne({ email });
      if (isThere === null) {
        // If admin user doesn't exist, hash password and create new admin user
        const hashPass = await bcrypt.hash(password, 12);
        const data = await admin.create({ name, email, password: hashPass }).then((dt) => {
          res.status(201).json("Admin Created Successfully");
        });
      } else {
        // If admin user already exists, return error
        if (isThere.email === email) {
          res.json(`Admin already exists using email ${email}`);
        }
      }
    } else {
      // If any required fields are missing, return error
      res.json("Name, Email and Password required.");
    }
  } catch (err) {
    // Handle any errors
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

// Function to logout admin user
const logoutAdmin = async (req, res) => {
  try {
    // Clear cookies by setting them to expire immediately
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");

    // Send a response indicating successful logout
    res.status(200).json("Logged out successfully");
  } catch (err) {
    // Handle any errors
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

// Export functions for use in other modules
module.exports = { loginAdmin, registerAdmin, logoutAdmin };
