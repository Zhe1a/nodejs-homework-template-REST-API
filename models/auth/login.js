const User = require("../../validation/users");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");

dotenv.config();

const SECRET = process.env.SECRET;

const getUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const { verify } = user;
  if (!verify) {
    return {
      status: "success",
      code: 401,
      message: "email is not verified",
    };
  }
  if (!user) {
    return {
      status: "success",
      code: 401,
      message: "Email or password is wrong",
    };
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return {
      status: "success",
      code: 401,
      message: "Email or password is wrong",
    };
  }
  const payload = {
    id: user._id,
  };
  const subscription = user.subscription;
  const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });
  await User.findOneAndUpdate(user._id, { token });

  return {
    token,
    user: { email, subscription },
  };
};
module.exports = getUser;
