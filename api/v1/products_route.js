const express = require("express");
const path = require("path");
// multer package used to upload images
const multer = require("multer");

const productsRouter = express.Router();
const checkAuth = require("../../middleware/checkAuth");

// filter files
const filterFiles = (req, file, cb) => {
  // Accept only files with this types
  if (
    file.mimetype === "image/gif" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    // this type not suported and not storaged
    cb(new Error(file.mimetype + " is not supported"), false);
  }
};

// configure uploading images
const storage = new multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: (req, file, cb) => {
    // console.log(file);
    let filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image_" + Date.now() + "." + filetype);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    // Limit size to 5 MB
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filterFiles
});

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
productsRouter.post("/", checkAuth, upload.single("file"), (req, res, next) => {
  const imagePath = req.file.filename;

  if (!req.body.name || !req.body.price) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    imagePath
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
  }).select("-__v");
});

productsRouter.patch("/:productId", checkAuth, (req, res, next) => {
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

productsRouter.delete("/:productId", checkAuth, (req, res, next) => {
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
