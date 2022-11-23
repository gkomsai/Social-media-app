const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");
const { authRouter } = require("./routes/auth.routes.js");
const { userRouter } = require("./routes/user.routes.js");
const { postsRouter } = require("./routes/posts.routes.js");
const { chatRouter } = require("./routes/chat.routes.js");
const { messageRouter } = require("./routes/message.routes.js");
const compression = require('compression')

const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }
  // else fallback to standard compression
  return compression.filter(req, res);
};

app.use(compression({
  level: 6,
  threshold: 1000,
  filter: shouldCompress,
}));




app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use('/posts', postsRouter)
app.use('/chats', chatRouter);
app.use('/message', messageRouter);





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
