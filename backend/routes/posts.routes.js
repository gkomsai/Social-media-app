const { Router } = require("express");
const mongoose = require("mongoose");
const { checkUserAuth } = require("../middleware/authMiddleware");
const { PostModel } = require("../models/postModel");
const { UserModel } = require("../models/userModel");
const {cloudinary} = require("../config/cloudinary");
const upload = require("../config/multer");
const postsRouter = Router();

postsRouter.use(checkUserAuth);

/*  ----------------------for uploading the images-------------------------------- */

postsRouter.post("/upload", upload.single("file"), async (req, res) => { //note- this "file" keyword  should be also present in the frontend input tag under name atrribute other wise file will not be uploaded
  try{
    const  result = await cloudinary.uploader.upload(req.file.path);
     if(result){
  return res.status(200).send(result);
     }
 
  }catch(err){
    console.error(err);
  }
  });




/*  ----------------------for creating a new post-------------------------------- */

postsRouter.post("/create",  async (req, res) => {
  console.log("req.body",req.body);

  try {
  const newPost = new PostModel({...req.body });
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
      return res
        .status(200)
        .send({ status: "success", message: "Post updated Successfully!" });
    } else {
      return res
        .status(403)
        .send({
          status: "error",
          message: "Action forbidden! you can't update other's posts",
        });
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

/*  ----------------------for liking and disliking  a post -------------------------------- */

postsRouter.patch("/like/:id", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  console.log(req.body);
  try {
    const foundPost = await PostModel.findById(id);
  
    if (foundPost.likes.includes(userId)) {
      await foundPost.updateOne({ $pull: { likes: userId } });
      res.status(200).send({ status: "success", message: "Post disliked" });
    } else {
      await foundPost.updateOne({ $push: { likes: userId } });
      // await foundPost.updateOne({ $push: { likes: userId }, new:true });
      console.log({foundPost});
      res.status(200).send({ status: "success", message: "Post liked" });
    }
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});

/*  ----------------------for getting the timeline post of a user -------------------------------- */


postsRouter.get("/:id/timeline", async (req, res) => {  
  // console.log("inside timeline post");
  const userId = req.params.id
  // const { userId } = req.body;
  try {
    const currentUserPosts = await PostModel.find({userId });
    // return res.send(currentUserPosts);

    const followingPostsMainArr = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 1,
        },
      },
    ]);
    // console.log("afteraggregate");
    res.status(200).send(
      currentUserPosts
        .concat(...followingPostsMainArr[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt); // we are sorting so that we can get these posts in the latest order
        })
    );
  } catch (err) {
    res.status(500).send({message:err.message});
  }
});

module.exports = { postsRouter };
