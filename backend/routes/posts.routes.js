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

 /*  ----------------------for getting a post-------------------------------- */
postsRouter.post("/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const foundPost = await PostModel.findById(id);
      res.status(200).send(foundPost);
    } catch (err) {
        return res.status(500).send({ status: "error", message: err.message });
    };
  });


   /*  ----------------------for getting all the posts of a particular user-------------------------------- */
postsRouter.post("/", async (req, res) => {
    const userId = req.body.userId;
    try {
      const foundPost = await PostModel.find({userId});

      if (foundPost.length > 0) {
        res.status(200).send(foundPost);
      } else {
        return res.send({ message: "First create a Post" });
      }
    } catch (err) {
        return res.status(500).send({ status: "error", message: err.message });
    };
  });

  



module.exports = {postsRouter};