const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

const User = require("../../models/user_model");

userRouter.post("/signup", (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  User.find({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }

    console.log("User:", user);

    if (user.length >= 1) {
      return res.status(409).json({
        error: "Mail exists"
      });
    }

    bcrypt.hash(
      req.body.password,
      bcrypt.genSaltSync(10),
      null,
      (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err.message
          });
        }

        const newUser = new User({
          email: req.body.email,
          name: req.body.name,
          password: hash
        });
        newUser.save((err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err.message
            });
          }

          res.status(201).json(result);
        });
      }
    );
  });
});

userRouter.post("/login", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    console.log("Missing Paramters");
    return res.status(400).json({
      error: "Missing Parameters"
    });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: err.message
      });
    }

    console.log("User:", user);

    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err.message
          });
        }
        if (result) {
          const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECERT_KEY,
            {
              expiresIn: 1800
            }
          );

          return res
            .status(200)
            .json({ msg: "Auth Successfully", token: token });
        }
        res.status(401).json({
          msg: "Invalid email or password"
        });
      });
    } else {
      res.status(401).json({
        msg: "Invalid email or password"
      });
    }
  });
});

module.exports = userRouter;
