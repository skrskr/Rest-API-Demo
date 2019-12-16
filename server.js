const express = require("express");
const mogran = require("morgan");
const app = express();

const productsRouter = require("./api/v1/products_route");
const ordersRouter = require("./api/v1/orders_route");

const PORT = process.env.PORT || 3000;

//loging pacage
app.use(mogran("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// Handle Errors Middlewares
// 404 Not found
app.use((req, res, next) => {
  const err = new Error("Resource Not Found");
  err.status = 404;
  next(err);
});

// handle errors Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

app.listen(PORT);
