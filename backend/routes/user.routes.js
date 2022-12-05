const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkUserAuth } = require("../middleware/authMiddleware");
const { UserModel } = require("../models/userModel");
const userRouter = Router();

/*  ----------------------for getting a singleuser-------------------------------- */

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc; 
      res.status(200).send(otherDetails);
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "No such user exists" });
    }
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});

/*  ----------------------for getting a allusers-------------------------------- */
userRouter.get("/", async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

userRouter.use(checkUserAuth);

/*  ----------------------for updating  a user-------------------------------- */

userRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id; // the id of the person who wants to update

  const { userId, password } = req.body;
  // console.log("req.body user ke patch req me", req.body);

  if (id === userId) {
    try {  
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).send(user);
    } catch (err) {
      // console.log(err);
      res.status(500).send({ status: "error", message: err.message });
    }
  } else {
    return res.status(403).send({
      status: "error",
      message: "Access Denied! You can update only your own Account.",
    });
  }
});

/*  ----------------------for Deleting a user-------------------------------- */

userRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const {userId} = req.body;

  if (userId === id) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(id);
      if (deletedUser) {
        return res
          .status(200)
          .send({ status: "success", message: "User Deleted Successfully!" });
      } else {
        return res.status(400).send({
          status: "error",
          message: "User already deleted",
        });
      }
    } catch (error) {
      res.status(500).send({ status: "error", message: err.message });
    }
  } else {
    return res.status(403).send({
      status: "error",
      message: "Access Denied! You can Delete only your own Account.",
    });
  }
});

/*  ----------------------for following a user-------------------------------- */

userRouter.patch("/:id/follow", async (req, res) => {
  // note- put or patch both will work
  const id = req.params.id;
  const currentUserId = req.body.userId;
  //   console.log(id, userId);
  if (currentUserId == id) {
    return res
      .status(403)
      .send({ status: "error", message: "You can't follow yourself" });
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } },{new:true});
        await followingUser.updateOne({ $push: { following: id } },{new:true});
        res
          .status(200)
          .send({ status: "success", message: "User followed Successfully!"});
      } else {
        return res.status(403).send({
          status: "error",
          message: "you are already following this user",
        });
      }
    } catch (err) {
      // console.log(err);
      res.status(500).send({ status: "error", message: err.message });
    }
  }
});

/*  ----------------------for unfollowing a user-------------------------------- */

userRouter.patch("/:id/unfollow", async (req, res) => {
  const id = req.params.id;
  const currentUserId = req.body.userId;
  //   console.log(id, currentUserId);
  if (currentUserId == id) {
    // i.e the person want to unfollow himself
    return res
      .status(403)
      .send({ status: "error", message: "Action Forbidden" });
  } else {
    try {
      const unfollowUser = await UserModel.findById(id); // the user which curr user want to unfollow
      const unfollowingUser = await UserModel.findById(currentUserId); // curr user

      if (unfollowUser.followers.includes(currentUserId)) {
        await unfollowUser.updateOne({ $pull: { followers: currentUserId } },{new:true});
        await unfollowingUser.updateOne({ $pull: { following: id } },{new:true});
        res
          .status(200)
          .send({ status: "success", message: "User unfollowed Successfully"});
      } else {
        return res.status(403).send({
          status: "error",
          message: "You are not following this User",
        });
      }
    } catch (err) {
      // console.log(err);
      res.status(500).send({ status: "error", message: err.message });
    }
  }
});

module.exports = { userRouter };
