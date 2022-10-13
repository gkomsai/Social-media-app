const passwordValidator = (req, res, next) => {
  if (req.method === "POST") {
    let { password } = req.body;
    if(password){
      let length = password.length;
      let isnumber = false;
  
      for (let i = 0; i < length; i++) {
        if (
          password[i] == 0 ||
          password[i] == 1 ||
          password[i] == 2 ||
          password[i] == 3 ||
          password[i] == 4 ||
          password[i] == 5 ||
          password[i] == 6 ||
          password[i] == 7 ||
          password[i] == 8 ||
          password[i] == 9
        ) {
          isnumber = true;
          break;
        }
      }
  
      let specialChar = false;
  
      if (
        password.includes("@") ||
        password.includes("#") ||
        password.includes("$") ||
        password.includes("%") ||
        password.includes("&") ||
        password.includes("*")
      ) {
        specialChar = true;
      }
      if (isnumber && length > 7 && specialChar) {
        next();
      } else {
        return res
          .status(400)
          .send({
            status: "error",
            message:
              "Password must be greater than 7 and must includes a number and specialCharater",
          });
      }
    }
   
  } else {
    next();
  }
};

module.exports = { passwordValidator };
