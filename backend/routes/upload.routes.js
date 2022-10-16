const { Router } = require("express");
const uploadRouter = Router();
const multer  = require('multer');
const cloudinary = require('cloudinary');
const path = require("path");
 require("../config/cloudinary");
 require("dotenv").config();
const { checkUserAuth } = require("../middleware/authMiddleware");




// uploadRouter.use(checkUserAuth);

/* ----------------------code for storing in local server------------------------------ */
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, req.body.name);
//     },
//   });
// const upload = multer({ storage: storage });

// uploadRouter.post("/", upload.single("file"),  (req, res) => { 
 //   try {
  //     return res.status(200).json({message:"File uploded successfully"});
  //   } catch (err) {
  //       console.log(err);
  //       return res.status(500).send({ status: "error", message: err.message });
  //   }
// });



/* ----------------------code for stroring in cloud server------------------------------ */
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter})




uploadRouter.post("/", upload.single("file"), async (req, res) => { //note- this "file" keyword  should be also present in the frontend input tag under name atrribute other wise file will not be uploaded
  try{
    const result = await cloudinary.uploader.upload(req.file.path);
    res.send(result);
  }catch(err){
    console.error(err);
  }

  

 
  });
module.exports= {uploadRouter};

