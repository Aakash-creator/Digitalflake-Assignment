const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
  {
    categoryname: { type: String, unique: true, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, required: true, enum: ["Active", "Inactive"] },
    isdeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const category = mongoose.model("category", categoryModel);

module.exports = { category };
