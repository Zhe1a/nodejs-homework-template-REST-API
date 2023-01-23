const User = require("../validation/users");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const SECRET = process.env.SECRET;

const UserMiddleware = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [Bearer, token] = authorization.split(" ");

    if (Bearer !== "Bearer") {
      res.status(400).json({ message: "not a bearer token" });
      return;
    }
    const data = jwt.verify(token, SECRET);

    const user = await User.findById(data.id);
    req.user = user;

    next();
  } catch (error) {
    if (!error) {
      error.status = 401;
      error.message = "Unauthorized";
    }
    next(error);
  }
};

module.exports = UserMiddleware;
