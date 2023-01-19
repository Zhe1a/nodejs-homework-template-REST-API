const User = require("../../validation/users");

const avatarGet = async (req, res, next) => {
  
  if (req.user) {
    const token = req.token;
    const { _id } = req.user;
    const avatar = await User.findOne({ _id }, { token });

    if (avatar) {
      return {
        status: 201,
        data: { avatar },
      };
    }
  }
  return {
    status: 401,
    message: "Not user",
  };
};

module.exports = avatarGet;
