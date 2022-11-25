const passwordValidator = (req, res, next) => {
  if (req.method === "POST") {
    let { password } = req.body;
    if (password) {
      const strongPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (password.match(strongPassword)) {

    /*   ---------------Custom Logic---------------------------  */
        // let length = password.length;
        // let isnumber = false;

        // for (let i = 0; i < length; i++) {
        //   if (
        //     password[i] == 0 ||
        //     password[i] == 1 ||
        //     password[i] == 2 ||
        //     password[i] == 3 ||
        //     password[i] == 4 ||
        //     password[i] == 5 ||
        //     password[i] == 6 ||
        //     password[i] == 7 ||
        //     password[i] == 8 ||
        //     password[i] == 9
        //   ) {
        //     isnumber = true;
        //     break;
        //   }
        // }

        // let specialChar = false;

        // if (
        //   password.includes("@") ||
        //   password.includes("#") ||
        //   password.includes("$") ||
        //   password.includes("%") ||
        //   password.includes("&") ||
        //   password.includes("*")
        // ) {
        //   specialChar = true;
        // }
        // if (isnumber && length > 7 && specialChar) {
        next();
      } else {
        return res.status(400).send({
          status: "error",
          message: "Weak Password",
          description:
            "Password must be between 8 to 15 characters and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
        });
      }
    }
  } else {
    next();
  }
};

module.exports = { passwordValidator };
