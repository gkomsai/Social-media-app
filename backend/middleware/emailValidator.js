const emailValidator = (req, res, next) => {
  if (req.method === "POST") {
    let email = req.body.email;
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      next();
    } else {
      return res
        .status(400)
        .send({
          status: "error",
          message: "Please enter valid email",
          description: null,
        });
    }
  } else {
    next();
  }
};

module.exports = { emailValidator };
