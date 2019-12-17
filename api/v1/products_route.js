const express = require("express");
const productsRouter = express.Router();

const Product = require("../../models/product_model");

productsRouter.get("/", (req, res, next) => {
  Product.find((err, products) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }

    const response = {
      count: products.length,
      products
    };
    res.status(200).json(response);
  }).select("-__v");
});

// 201 --> resource created successfully
productsRouter.post("/", (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  console.log(product);

  product.save((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    res.status(201).json(result);
  });
});

productsRouter.get("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, (err, product) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(400).json({ error: "Product not found" });
    }
  });
});

productsRouter.patch("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  console.log(req.body);
  const updatedProduct = req.body;
  Product.updateOne({ _id: productId }, updatedProduct, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    console.log("RESULT:", result);

    if (result.n) {
      return res.status(200).json({ msg: "Product Updated Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Product Id" });
    }
  });
});

productsRouter.delete("/:productId", (req, res, next) => {
  const productId = req.params.productId;

  Product.deleteOne({ _id: productId }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    console.log("RESULT:", result);

    if (result.n) {
      return res.status(200).json({ msg: "Product deleted Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Product Id" });
    }
  });
});

module.exports = productsRouter;
