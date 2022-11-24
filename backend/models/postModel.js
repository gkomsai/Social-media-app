const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true},
    description: {type: String, required : true},
    likes: [],
    image: String,
    cloudinary_id: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };
