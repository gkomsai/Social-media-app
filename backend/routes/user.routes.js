const express = require("express");
const { Router } = require("express");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
require("dotenv").config();

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
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



module.exports = { userRouter };
