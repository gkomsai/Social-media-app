const { Router } = require("express");
const uploadRouter = Router();
const path = require("path");
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({ storage: storage });


uploadRouter.post("/", upload.single("file"), (req, res) => { //npte- this "file" keyword  should be also present in the frontend input tag under name atrribute other wise file will not be uploaded
    try {
      return res.status(200).json({message:"File uploded successfully"});
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: "error", message: err.message });
    }
  });
module.exports= {uploadRouter};

