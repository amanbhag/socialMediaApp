const express = require("express");
const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const { verifyToken } = require("../middleware/auth");
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controller/userDetails");
// read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
// update
router.get("/:id/:friendId", verifyToken, addRemoveFriend);

module.exports = router;
