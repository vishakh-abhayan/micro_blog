const express = require("express");
const router = express.Router();
const {
  postMicroblog,
  getAllMicroblogs,
} = require("../controllers/microblog.controller");
const verifyToken = require("../middlewares/authJWT");

router.post("/post", verifyToken, postMicroblog);
router.get("/all", getAllMicroblogs);

module.exports = router;
