const Product = require("../models/product_model");

// Get all products
module.exports.products_get_all = (req, res, next) => {
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
};

// create new product
module.exports.products_create_product = (req, res, next) => {
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

  product.save((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }
    res.status(201).json(result);
  });
};

// get product by id
module.exports.products_get_product = (req, res, next) => {
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
};

// Update Product
module.exports.products_update_product = (req, res, next) => {
  const productId = req.params.productId;
  const updatedProduct = req.body;
  Product.updateOne({ _id: productId }, updatedProduct, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.n) {
      return res.status(200).json({ msg: "Product Updated Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Product Id" });
    }
  });
};

// Delete Product
module.exports.products_delete_product = (req, res, next) => {
  const productId = req.params.productId;

  Product.deleteOne({ _id: productId }, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }

    if (result.n) {
      return res.status(200).json({ msg: "Product deleted Successfully" });
    } else {
      return res.status(404).json({ error: "Invalid Product Id" });
    }
  });
};
