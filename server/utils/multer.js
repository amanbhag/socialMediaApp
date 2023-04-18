const multer = require("multer");
const path = require("path");
// Multer config
//multer will store temporarily files in temp folder
module.exports = multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  //file filter will check if the file is image or not
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // console.log("file.originalname: ", file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
