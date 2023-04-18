const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../models/user");
const { register, login } = require("../controller/user");

router.post("/user/register", upload.single("picture"), register);
router.post("/user/login", login);

module.exports = router;
