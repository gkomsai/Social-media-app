const mongoose = require("mongoose");

const reqString={ type: String, required: true, trim:true}
const postSchema = mongoose.Schema(
  {
    userId: reqString,
    description: reqString,
    likes: [],
    image: String,
    cloudinary_id: String,
  },
  { versionKey: false, timestamps: true }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };
