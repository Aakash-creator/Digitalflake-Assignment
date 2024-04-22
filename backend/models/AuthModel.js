const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const registerModel = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Authadmin = mongoose.model("admin", registerModel);

module.exports = { Authadmin };
