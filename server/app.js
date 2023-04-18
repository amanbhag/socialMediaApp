const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/app");
const authRoutes = require("./routes/users");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const { verifyToken } = require("./middleware/auth");
const { createPost } = require("./controller/posts");
const postRoutes = require("./routes/posts");
const app = express();
const upload = require("./utils/multer");
const User = require("./models/user");
const Post = require("./models/posts");

const { users, posts } = require("./data");

// const path = require("path");
// const { fileURLToPath } = require("url");

require("dotenv").config();

//Connect to database
try {
  mongoose.connect(
    "mongodb+srv://amanbhagtani:amanbhagtani@cluster0.xatwzx3.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  // .then(() => {
  //   User.insertMany(users);
  //   Post.insertMany(posts);
  // });
  console.log("connected to db");
} catch (error) {
  handleError(error);
}
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});
app.use(cors());
//
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// parse requests of content-type - application/json
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
//auth for login register auth/user/register / login

app.use("/auth", userRoutes);
app.use("/user", authRoutes);
app.use("/posts", postRoutes);
app.listen(8080, function () {
  console.log("App running!");
});
