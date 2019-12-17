const express = require("express");
const userRouter = express.Router();

const UserController = require("../../controllers/user_controller");

userRouter.post("/signup", UserController.user_register);
userRouter.post("/login", UserController.user_login);

module.exports = userRouter;
