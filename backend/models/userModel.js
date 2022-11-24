const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePicture: String,
    cloudinaryProfilePicture_id: String,
    coverPicture: String,
    cloudinaryCoverPicture_id: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { versionKey: false, timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
