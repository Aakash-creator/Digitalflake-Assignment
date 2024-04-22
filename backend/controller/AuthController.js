// Import necessary modules
const { Authadmin } = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
      const isThere = await Authadmin.findOne({ email });
      if (isThere === null) {
        // If admin user doesn't exist, hash password and create new admin user
        const hashPass = await bcrypt.hash(password, 12);
        const data = await Authadmin.create({ name, email, password: hashPass }).then((dt) => {
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

const resetPassword = (req, res) => {
  const { email } = req.body;

  // Find the admin by email
  Authadmin.findOne({ email: email })
    .then((admin) => {
      if (!admin) {
        return res.send({ Status: "Admin not existed" });
      }

      // Generate JWT token
      const token = JWT.sign({ id: admin._id }, process.env.JWTACCESSTOKENSECRET, { expiresIn: "1d" });

      const email = process.env.EMAIL;
      const mailPass = process.env.PASSWORD;

      console.log(email + " " + mailPass);

      // Create transporter for sending email
      var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 5173,
        secure: true,
        debug: true,
        auth: {
          user: email,
          pass: mailPass,
        },
        tls: {
          rejectUnauthorized: true,
        },
      });

      // Prepare email options
      var mailOptions = {
        from: email,
        to: admin.email, // Use admin's email here
        subject: "Reset Password Link",
        text: `http://localhost:5173/resetpassword/${admin._id}/${token}`,
      };

      // Send email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).send({ Status: "Error sending email" });
        } else {
          return res.send({ Status: "Success" });
        }
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ Status: "Internal Server Error" });
    });
};

const updatePassword = (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWTACCESSTOKENSECRET, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 12)
        .then((hash) => {
          AdminModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
};

// Export functions for use in other modules
module.exports = { loginAdmin, registerAdmin, logoutAdmin, resetPassword, updatePassword };
