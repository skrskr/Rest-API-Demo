const Order = require("../models/order_model");
const Product = require("../models/product_model");

// Get all orders
module.exports.orders_get_all = (req, res, next) => {
  Order.find((err, orders) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    const response = {
      count: orders.length,
      orders
    };
    res.status(200).json(response);
  })
    .select("-__v")
    .populate("productId");
};

// create new order
module.exports.orders_create_order = (req, res, next) => {
  if (!req.body.productId) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  const order = new Order({
    productId: req.body.productId,
    qty: req.body.qty
  });

  order.save((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    res.status(201).json(result);
  });
};

// Get order by id
module.exports.orders_get_order = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId, (err, order) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    if (order) {
      return res.status(200).json(order);
    } else {
      return res.status(400).json({ error: "Order not found" });
    }
  })
    .select("-__v")
    .populate("productId");
};

// Update Order
module.exports.orders_update_order = (req, res, next) => {
  const orderId = req.params.orderId;
  const updatedOrder = req.body;
  Order.updateOne({ _id: orderId }, updatedOrder, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.n) {
      return res.status(200).json({ msg: "Order Updated Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Order Id" });
    }
  });
};

// Delete Order
module.exports.orders_delete_order = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.deleteOne({ _id: orderId }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    if (result.n) {
      return res.status(200).json({ msg: "Order deleted Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Order Id" });
    }
  });
};
