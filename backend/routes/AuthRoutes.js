const express = require("express");
const router = express.Router();
const { loginAdmin, registerAdmin, logoutAdmin, resetPassword, updatePassword } = require("../controller/AuthController");

// Route to test if authentication router is working
router.get("/login", (req, res) => {
  res.status(200).send("working fine");
});

// Route to handle admin login
router.post("/login", loginAdmin);

// Route to handle admin registration
router.post("/register", registerAdmin);

// Route to handle admin logout
router.post("/logout", logoutAdmin);

// Route to test if authentication router is working
router.get("/test", (req, res) => {
  res.send("working at auth.js");
});

// Route to send mail to reset password
router.post("/forgotpassword", resetPassword);

// Route to reset password
router.post("/resetpassword/${admin._id}/${token}", updatePassword);

// Export router for use in other modules
module.exports = router;
