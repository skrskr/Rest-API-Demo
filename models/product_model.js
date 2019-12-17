const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model("products", productModel);
module.exports = Product;
