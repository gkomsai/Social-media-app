const express = require("express");
const { Router } = require("express");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
const {
  emailPassRequiredValidator,
} = require("../middleware/emailPassRequiredValidator");
const { passwordValidator } = require("../middleware/passwordValidator");
const { emailValidator } = require("../middleware/emailValidator");
const { transporter } = require("../config/emailConfig");
const { checkUserAuth } = require("../middleware/authMiddleware");
require("dotenv").config();

const authRouter = Router();

authRouter.post(
  "/signup",
  [emailPassRequiredValidator, emailValidator, passwordValidator],
  async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      const isemailPresent = await UserModel.findOne({ email });
      // console.log(isemailPresent);
      if (isemailPresent) {
        res
          .status(400)
          .send({ status: "error", message: "email already exists" });
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
  }
);

authRouter.post("/login", emailPassRequiredValidator, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
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
            { userId: user._id },
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

authRouter.post("/forgotten_password", async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
      });
      const link = `http://localhost:3000/reset-password/${user._id}/${token}`;

      // console.log(link);

      let info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Indian Social Media App - Password Reset Link",
        html: `It seems you have forgotten your password. That's OK, it happens to the best of us! Would you like to reset your password: <a href=${link}>Click Here</a> to Reset Your Password
          <p> If you do not wish to reset your password, ignore this message. It will expire in 15 minutes.</p>
          `,
      });
      res.status(200).send({
        status: "success",
        message: "Password Reset Email Sent... Please Check Your Email",
      });
    } else {
      res
        .status(400)
        .send({ status: "error", message: "Email doesn't exists" });
    }
  } else {
    res
      .status(400)
      .send({ status: "error", message: "Email Field is Required" });
  }
});

authRouter.post(
  "/reset-password/:id/:token",
  passwordValidator,
  async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { id, token } = req.params;

    const user = await UserModel.findById(id);

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          return res.status(500).send({
            status: "error",
            message: "New Password and Confirm New Password doesn't match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.status(201).send({
            status: "success",
            message: "Password Reset Successfully",
          });
        }
      } else {
        res
          .status(400)
          .send({ status: "error", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ status: "error", message: "Invalid Token" });
    }
  }
);

authRouter.post(
  "/change-password/",
  [checkUserAuth, passwordValidator],
  async (req, res) => {
    const { password, confirmPassword, userId } = req.body;
 
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(500).send({
          status: "error",
          message: "New Password and Confirm New Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);

        await UserModel.findByIdAndUpdate(userId, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "success",
          message: "Password changed succesfully",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  }
);

module.exports = { authRouter };
