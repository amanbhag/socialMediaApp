const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  //this will take header authorization to verify jwt token
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Acess denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.lenght).trimLeft();
    }
    const verified = jwt.verify(token, "dsjsdkdsjkdskj");
    req.user = verified;
    next();
  } catch (err) {
    console.log("err: ", err);
    return res.status(500).json({ errro: err.message });
  }
};
