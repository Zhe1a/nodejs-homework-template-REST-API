const Users = require("../../validation/users");
const bcrypt = require("bcrypt");
var gravatar = require("gravatar");
const confirmation = require("../email/confirmation");

const { v4: uuidv4 } = require("uuid");
const AddUsers = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  let url = gravatar.url(email);

  const user = await Users.findOne({ email });

  if (user) {
    return {
      status: "success",
      code: 409,
      message: "Email in use",
    };
  }
  const hashPasswordUser = await bcrypt.hash(password, 10);

  const token = uuidv4();
  const newUser = await Users.create({
    ...req.body,
    avatarURL: url,
    password: hashPasswordUser,
    verificationToken: token,
  });

  await confirmation(req.headers, email, token);

  return {
    status: "success",
    code: 201,
    user: {
      email: newUser.email,
      subscription,
    },
  };
};
module.exports = AddUsers;
