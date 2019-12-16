const express = require("express");
const ordersRouter = express.Router();

ordersRouter.get("/", (req, res, next) => {
  res.status(200).json({
    msg: "Handle GET / orders Route"
  });
});

// 201 --> resource created successfully
ordersRouter.post("/", (req, res, next) => {
  res.status(201).json({
    msg: "Handle POST / orders Route"
  });
});

ordersRouter.get("/:orderId", (req, res, next) => {
  const orderId = req.params.orderId;
  if (orderId === "special") {
    res.status(200).json({
      msg: "Handle GET /:id orders Route with speicail id",
      id: req.params.orderId
    });
  } else {
    res.status(200).json({
      msg: "Handle GET /:id orders Route",
      id: req.params.orderId
    });
  }
});

ordersRouter.patch("/:orderId", (req, res, next) => {
  res.status(200).json({
    msg: "Handle PATCH /:id orders Route",
    id: req.params.orderId
  });
});

ordersRouter.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    msg: "Handle DELETE /:id orders Route",
    id: req.params.orderId
  });
});

module.exports = ordersRouter;
