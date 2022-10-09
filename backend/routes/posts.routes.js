const { Router } = require("express");
const { checkUserAuth } = require("../middleware/authMiddleware");
const { PostModel } = require("../models/postModel");
const postsRouter = Router();



postsRouter.use(checkUserAuth);


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

  /*  ----------------------for updating a posts of a particular user-------------------------------- */
  
postsRouter.patch("/:id", async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(postId);
      if (post.userId === userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).send({ status: "success", message: "Post updated Successfully!" });
      } else {
        res.status(403).send({ status: "error", message: "Authentication failed" }) ;
      }
    }catch (err) {
        return res.status(500).send({ status: "error", message: err.message });
    }
  });



  /*  ----------------------for getting all the posts of a particular user-------------------------------- */

  postsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(id);
      if (post.userId === userId) {
        await post.deleteOne();
       return res.status(200).send({ status: "success", message: "Post deleted Successfully!" });
      } else {
      return  res.status(403).send({ status: "error", message:"Action forbidden" });
      }
    } catch (error) {
        return res.status(500).send({ status: "error", message: err.message });
    }
  });

  



module.exports = {postsRouter};