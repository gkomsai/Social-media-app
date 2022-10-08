const { Router } = require("express");
const { checkUserAuth } = require("../middleware/authMiddleware");
const userRouter = Router();

/*  ----------------------for getting a singleuser-------------------------------- */

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc; // note- all the details we are receiving in the response  will lie under this ._doc
      res.status(200).send(otherDetails);
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "No such user exists" });
    }
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

/*  ----------------------for getting a allusers-------------------------------- */
userRouter.get("/", async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

userRouter.use(checkUserAuth);


/*  ----------------------for updating  a user-------------------------------- */

userRouter.patch("/id", async (req, res) => {
  const id = req.params.id; // the id of the person who wants to update

  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2h" }
      );
      console.log({ user, token });
      return res.status(200).send({ user, token });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "error", message: err.message });
    }
  } else {
    return res.status(403).send({
      status: "error",
      message: "Access Denied! You can update only your own Account.",
    });
  }
});

/*  ----------------------for Deleting a user-------------------------------- */

userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);

      res.status(200).send({ status: "error", message: "User Deleted Successfully!" });
    } catch (error) {
      res.status(500).send({status: "error",  message: err.message});
    }
  } else {
    return res.status(403).send({
      status: "error",
      message: "Access Denied! You can Delete only your own Account.",
    });
  }
});

userRouter.put("/:id/follow", )

module.exports = { userRouter };
