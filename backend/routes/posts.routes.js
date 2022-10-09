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
postsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const foundPost = await PostModel.findById(id);
    if (foundPost) {
      return res.status(200).send(foundPost);
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Post doesn't exists" });
    }
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});


/*  ----------------------for getting all the posts of a particular user-------------------------------- */
postsRouter.get("/", async (req, res) => {
  const userId = req.body.userId;
  try {
    const foundPost = await PostModel.find({ userId });

    if (foundPost.length > 0) {
      res.status(200).send(foundPost);
    } else {
      return res.send({ message: "First create a Post" });
    }
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});



/*  ----------------------for updating a posts of a particular user-------------------------------- */

postsRouter.patch("/update/:id", async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const foundPost = await PostModel.findById(postId);
    if (foundPost.userId === userId) {
      await foundPost.updateOne({ $set: req.body });
    return  res
        .status(200)
        .send({ status: "success", message: "Post updated Successfully!" });
    } else {
   return   res
        .status(403)
        .send({ status: "error", message: "Action forbidden! you can't update other's posts" });
    }
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});

/*  ----------------------for deleting  a post of a particular user-------------------------------- */

postsRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const foundPost = await PostModel.findById(id);
    if (foundPost.userId === userId) {
      await foundPost.deleteOne();
      return res
        .status(200)
        .send({ status: "success", message: "Post deleted Successfully!" });
    } else {
      return res
        .status(403)
        .send({ status: "error", message: "You can't delete other's posts" });
    }
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});

module.exports = { postsRouter };
