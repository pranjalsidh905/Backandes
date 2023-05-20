const jwt = require("jsonwebtoken");

const secret = "pranjalsidhjan";
const generateToken = (data) => {
  const token = jwt.sign({ data }, secret, { expiresIn: "1h" });

  console.log(">>>>>>>>>>>>>>>>>>>token", token);
  return token;
};
const auth = (req, res, next) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>req.headers", req.headers);
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
    try {
      var user = jwt.verify(token, secret);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>user", user);
      next();
    } catch (e) {
      console.log(">>>>>>>>>>>>>>>>>", e);
      res.status(403).send({
        success: false,
        message: "Invalid Token",
      });
    }
  } else {
    console.log(">>>>>>>>>>>>>>>>>>>>no token found");
    res.status(403).send({
      success: false,
      message: "No Token Found",
    });
  }
};
module.exports = { generateToken, auth };
