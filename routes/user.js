var express = require("express"),
  router = express.Router(),
  verifyToken = require("../middlewares/authJWT"),
  { signup, signin } = require("../controllers/auth.controller.js");

router.post("/register", signup);

router.post("/login", signin);

router.get("/hiddencontent", verifyToken, (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(404).send({ message: "User not found." });
      return;
    }

    if (user.role === "admin") {
      res
        .status(200)
        .send({ message: "Congratulations! But there is no hidden content" });
    } else {
      res.status(403).send({ message: "Unauthorized access" });
    }
  });
});

module.exports = router;
