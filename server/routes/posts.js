const express = require("express");
const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const { verifyToken } = require("../middleware/auth");
const { getFeedPosts, getUserPosts, likePost } = require("../controller/posts");
//confusion between picture and image
/* read */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
//update
router.patch("/:id/like", verifyToken, likePost);

module.exports = router;
