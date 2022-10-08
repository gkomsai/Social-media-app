const { Router } = require("express");
const { PostModel } = require("../models/postModel");
const postsRouter = Router();


/*  ----------------------for creating a new post-------------------------------- */

postsRouter.post("/create", async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).send(newPost);
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});


module.exports = {postsRouter};