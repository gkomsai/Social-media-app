const mongoose = require("mongoose");

const reqString = { type: String, required:true,trim:true};

const messageSchema = new mongoose.Schema({
    chatId: reqString,
    senderId: reqString,
    text: reqString,
  },
  { versionKey: false, timestamps: true }
);

const MessageModel = mongoose.model("message", messageSchema);

module.exports= {MessageModel};
