var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../model/user");

exports.signup = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      role: req.body.role,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).send({ message: "User Registered successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Comparing passwords
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    // Signing token with user id
    const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: 86400,
    });

    // Responding to client request with user profile, success message, and access token
    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
