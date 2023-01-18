const User = require("../validation/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET = process.env.SECRET;

const UserMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(400).json({ message: "not a bearer token" });
    return;
  }
  
  const data = jwt.verify(token, process.env.SECRET);
  const user = await User.findUserById(data.id);
req.user = user
req.token = token
  next();
};

module.exports = UserMiddleware;
