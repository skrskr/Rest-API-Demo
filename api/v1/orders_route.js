const express = require("express");
const ordersRouter = express.Router();

const checkAuth = require("../../middleware/checkAuth");
const Order = require("../../models/order_model");
const paginationModel = require("../../middleware/pagination");
const OrdersController = require("../../controllers/orders_controller");

ordersRouter.get(
  "/",
  checkAuth,
  paginationModel(Order, "productId"),
  OrdersController.orders_get_all
);

// 201 --> resource created successfully
ordersRouter.post("/", checkAuth, OrdersController.orders_create_order);

ordersRouter.get("/:orderId", checkAuth, OrdersController.orders_get_order);

ordersRouter.patch(
  "/:orderId",
  checkAuth,
  OrdersController.orders_update_order
);

ordersRouter.delete(
  "/:orderId",
  checkAuth,
  OrdersController.orders_delete_order
);

module.exports = ordersRouter;
