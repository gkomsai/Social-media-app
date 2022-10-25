const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    members: { type: Array },
  },
  { versionKey: false, timestamps: true }
);
const ChatModel = mongoose.model("chat", chatSchema);

module.exports = { ChatModel };
