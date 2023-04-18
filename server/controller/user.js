const cloudinary = require("../utils/cloudinary");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    // Upload image to cloudinary
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;
    //generate salt and hash it
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    ///upload image from req.file .path generated with the help of multer

    const result = await cloudinary.uploader.upload(req.file.path, {
      gravity: "face",
      height: 500,
      width: 500,
      crop: "thumb",
    });

    // Create new user
    let user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: result.secure_url,
      friends,
      location,
      occupation,
      cloudinary_id: result.public_id,
      viewedProfile: Math.floor(Math.random() * 10000),
    });
    // cloudinary_id: result.public_id,
    // save user details in mongodb
    await user.save();
    ///return response to user
    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("password: ", password);
    // console.log("email: ", email);
    const user = await User.findOne({ email: email });
    //converted user result to object because we cannot perfrom delete action in mongoose query
    const userResult = await user.toObject();
    if (!userResult) return res.status(400).json({ msg: "email is wrong" });
    const isMatch = await bcrypt.compare(password, userResult.password);
    if (!isMatch) return res.status(400).json({ msg: "password is wrong " });
    const token = jwt.sign({ id: userResult._id }, "dsjsdkdsjkdskj");
    const newUser = delete userResult.password;
    res.status(200).json({ token: token, userResult });
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).json({ error: err.message });
  }
};
