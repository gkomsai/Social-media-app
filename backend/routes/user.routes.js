const {Router} = require ("express");
const userRouter = Router();

/*  ----------------------for getting a singleuser-------------------------------- */

userRouter.get('/:id',  async (req, res) => {
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
    } catch (error) {
      res.status(500).json(error);
    }
  });



userRouter.get('/',async (req, res) => {
    try {
      let users = await UserModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  });




module.exports = {userRouter}