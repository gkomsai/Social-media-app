const { Router } = require("express");
const { checkUserAuth } = require("../middleware/authMiddleware");
const { MessageModel } = require("../models/messageModel");
const messageRouter = Router();

messageRouter.use(checkUserAuth);

messageRouter.post("/", async (req, res) => {
  const { chatId, senderId, text } = req.body;
  try {
    const newMessage = new MessageModel({ chatId, senderId, text });
    await newMessage.save();
    res.status(200).send(newMessage);
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});

messageRouter.get("/:chatId", async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ status: "error", message: err.message });
  }
});

module.exports = { messageRouter };
