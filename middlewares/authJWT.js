const jwt = require("jsonwebtoken");
const User = require("../model/user");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.API_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      req.user = user;
      next();
    } catch (err) {
      res
        .status(500)
        .send({ message: "Server error during user verification." });
    }
  });
};

module.exports = verifyToken;
