const Users = require("../validation/users");
const bcrypt = require("bcrypt");

const getAddUsers = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  const user = await Users.findOne({ email });

  if (user) {
    return {
      status: "success",
      code: 409,
      message: "Email in use",
    };
  }
  const hashPasswordUser = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    ...req.body,
    password: hashPasswordUser,
  });

  return {
    status: "success",
    code: 201,
    user: {
      email: newUser.email,
      subscription,
    },
  };
};
module.exports = getAddUsers;
