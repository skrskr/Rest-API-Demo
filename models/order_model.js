const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true
  },
  qty: { type: Number, default: 1 }
});

const Order = mongoose.model("orders", orderModel);
module.exports = Order;
