const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");
const { authRouter } = require("./routes/auth.routes.js");
const { userRouter } = require("./routes/user.routes.js");
const { postsRouter } = require("./routes/posts.routes.js");
const { uploadRouter } = require("./routes/upload.routes.js");

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use('/posts', postsRouter)
app.use('/upload', uploadRouter);




app.get("/", (req, res) => {
  res.send("Welcome to social-media-app backend server home page");
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`app is listening on port ${port}`);
    console.log("conneted to DB");
  } catch (error) {
    console.log(error);
  }
});
