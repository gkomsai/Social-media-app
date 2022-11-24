const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    //   filename: function(req, file, callback) {
    //     console.log(req,file)
    //     callback(null, Date.now() + file.originalname);
    //   }
    });
    var imageFilter = function (req, file, cb) {
        // accept image files only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

const upload = multer({ storage: storage, fileFilter: imageFilter})

// Multer config
// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);  
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });
module.exports=upload;