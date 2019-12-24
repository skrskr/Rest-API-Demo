const express = require("express");
const mongoose = require("mongoose");
// const mogran = require("morgan");
const cors = require("cors");
// require("dotenv").config();
const app = express();

const productsRouter = require("./api/v1/products_route");
const ordersRouter = require("./api/v1/orders_route");
const userRouter = require("./api/v1/user_route");

const PORT = process.env.PORT || 3000;
const MONGO_URL =
  "mongodb://sakr:sakr@cluster0-shard-00-00-ocmui.mongodb.net:27017,cluster0-shard-00-01-ocmui.mongodb.net:27017,cluster0-shard-00-02-ocmui.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

//Setup Mongodb

mongoose.connect(MONGO_URL, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("Can't connect to mongo ERR:", err);
  } else {
    console.log("Connected to mongodb successfully");
  }
});
// Cors confige
app.use(cors());

//loging pacage
// app.use(mogran("dev"));

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

// serve static files
app.use("/public", express.static("public"));

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/user", userRouter);

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
