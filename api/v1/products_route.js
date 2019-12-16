const express = require("express");
const productsRouter = express.Router();

productsRouter.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "Handle GET / products Route"
  });
});

// 201 --> resource created successfully
productsRouter.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    msg: "Handle POST / products Route",
    product
  });
});

productsRouter.get("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  if (productId === "special") {
    res.status(200).json({
      msg: "Handle GET /:id products Route with speicail id",
      id: req.params.productId
    });
  } else {
    res.status(200).json({
      msg: "Handle GET /:id products Route",
      id: req.params.productId
    });
  }
});

productsRouter.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    msg: "Handle PATCH /:id products Route",
    id: req.params.productId
  });
});

productsRouter.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    msg: "Handle DELETE /:id products Route",
    id: req.params.productId
  });
});

module.exports = productsRouter;
