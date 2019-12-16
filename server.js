const express = require("express");
const mogran = require("morgan");
var cors = require("cors");
const app = express();

const productsRouter = require("./api/v1/products_route");
const ordersRouter = require("./api/v1/orders_route");

const PORT = process.env.PORT || 3000;

// Cors confige
app.use(cors());

//loging pacage
app.use(mogran("dev"));

//CORS middleware
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
//     return res.status(200).json({});
//   }

//   next();
// });

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
