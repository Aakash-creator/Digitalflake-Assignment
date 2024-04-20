const express = require("express");
const router = express.Router();
const { loginAdmin, registerAdmin, isAdminValid } = require("../controller/AuthController");

router.get("/login", (req, res) => {
  res.status(200).send("working fine");
});

router.post("/login", loginAdmin);

router.post("/register", registerAdmin);

router.get("/test", isAdminValid, (req, res) => {
  res.send("working at auth.js");
});

module.exports = router;
