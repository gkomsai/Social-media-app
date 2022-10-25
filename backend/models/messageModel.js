const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const MessageModel = mongoose.model("message", MessageSchema);

module.exports= {MessageModel};
