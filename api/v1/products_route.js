const express = require("express");
const path = require("path");
// multer package used to upload images
const multer = require("multer");

const productsRouter = express.Router();
const checkAuth = require("../../middleware/checkAuth");
const ProductsController = require("../../controllers/products_controller");

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

productsRouter.get("/", ProductsController.products_get_all);

// 201 --> resource created successfully
productsRouter.post(
  "/",
  checkAuth,
  upload.single("file"),
  ProductsController.products_create_product
);

productsRouter.get("/:productId", ProductsController.products_get_product);

productsRouter.patch(
  "/:productId",
  checkAuth,
  ProductsController.products_update_product
);

productsRouter.delete(
  "/:productId",
  checkAuth,
  ProductsController.products_delete_product
);

module.exports = productsRouter;
