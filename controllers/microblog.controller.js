const Microblog = require("../model/microblog");

exports.postMicroblog = async (req, res) => {
  try {
    const microblog = new Microblog({
      userId: req.user._id, // Accessing _id of the user
      content: req.body.content,
    });

    await microblog.save();
    res
      .status(201)
      .send({ message: "Microblog posted successfully", microblog });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllMicroblogs = async (req, res) => {
  try {
    const microblogs = await Microblog.find().populate("userId", "fullName");
    res.status(200).send(microblogs);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
