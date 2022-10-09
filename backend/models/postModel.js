const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true},
    description: {type: String, required : true},
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
  },
  { versionKey: false, timestamps: true }
);

var PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };
