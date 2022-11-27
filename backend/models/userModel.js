const mongoose = require("mongoose");
const reqString = { type: String, required: true, trim:true };

const UserSchema = mongoose.Schema(
  {
    email: reqString,
    password: reqString,
    firstName: reqString,
    lastName: reqString,
    profilePicture: String,
    cloudinaryProfilePicture_id: String,
    coverPicture: String,
    cloudinaryCoverPicture_id: String,
    about: String,
    livesIn: String,
    workStatus: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { versionKey: false, timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel };
