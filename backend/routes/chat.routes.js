const { Router } = require("express");
const { checkUserAuth } = require("../middleware/authMiddleware");
const { ChatModel } = require("../models/chatModel");
const chatRouter = Router();


chatRouter.use(checkUserAuth);


chatRouter.post("/", async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});




chatRouter.get("/:userId", async (req, res) => {
  try {
    const foundMember = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).send(foundMember);
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});



chatRouter.get("/find/:firstId/:secondId", async (req, res) => {
  try {
    const foundChat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).send(foundChat);
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});
module.exports = { chatRouter };
