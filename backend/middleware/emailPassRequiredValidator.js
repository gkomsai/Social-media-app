const emailPassRequiredValidator = (req, res, next) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ status: "error", message: "All Fields are Required" });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = { emailPassRequiredValidator };
