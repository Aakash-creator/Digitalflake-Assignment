const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
  productname: { type: String, unique: true, trim: true },
  category: { type: String, trim: true, required: true },
  mrp: { type: String, trim: true, required: true },
  packsize: { type: String, trim: true, required: true },
  status: { type: String, enum: ["Active", "Inactive"], required: true },
  // productimage: { type: String, trim: true },
});

const product = mongoose.model("product", productModel);
module.exports = { product };
