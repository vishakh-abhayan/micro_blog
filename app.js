const express = require("express");
const port = process.env.PORT || 3000;
mongoose = require("mongoose");
require("dotenv").config();
userRoutes = require("./routes/user");
microblogRoutes = require("./routes/microblog");

const app = express();

try {
  mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
} catch (err) {
  console.log(err);
  handleError(err);
}

process.on("uncaughtException", (err) => {
  console.log("unhandledRejection", err.message);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use("/microblog", microblogRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
