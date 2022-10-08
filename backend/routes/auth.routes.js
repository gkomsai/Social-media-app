const express = require("express");
const { Router } = require("express");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
require("dotenv").config();

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);
    const { userName, password } = req.body;
    const isEmailPresent = await UserModel.findOne({ userName });
    // console.log(isEmailPresent);
    if (userName) {
      res
        .status(400)
        .send({ status: "error", message: "Email already exists" });
    } else {
      bcrypt
        .hash(password, 10)
        .then(async function (hash) {
          const newUser = new UserModel({ ...req.body, password: hash });
          await newUser.save();

          return res.status(201).send({
            message: "Signup Sussessfull",
            status: "success",
            user: newUser,
          });
        })
        .catch((err) => {
          // console.log(err);
          return res
            .status(400)
            .send({ status: "error", message: err.message });
        });
    }
  } catch (err) {
    return res.status(400).send({ status: "error", message: err.message });
  }
});



authRouter.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await UserModel.findOne({ userName });
    //   console.log(user);
    if (user) {
      let hash = user.password;
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          return res.send({
            message: "Something went wrong, plz try again later",
            status: "error",
          });
        }
        if (result) {
          const token = jwt.sign(
            { userId: user._id, userName: userName },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "5h",
            }
          );
          return res.status(200).send({
            status: "success",
            message: "Login Successfull!!!",
            token: token,
            user: user,
          });
        } else {
          return res
            .status(400)
            .send({ status: "error", message: "Invalid Credentials" });
        }
      });
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Invalid Credentials" });
    }
  } catch (err) {
    // console.log(err);
    return res
      .status(400)
      .send({ status: "error", message: "Unable to Login" });
  }
});


module.exports = { authRouter };
