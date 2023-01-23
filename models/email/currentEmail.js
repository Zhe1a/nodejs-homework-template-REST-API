const User = require("../../validation/users");
const confirmation = require("./confirmation");

const currentEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!email) {
      return {};
    }
    const { verificationToken } = user;
    await confirmation(req.headers, email, verificationToken);
  } catch (error) {
    return {
      Status: 404,
      ResponseBody: {
        message: "User not found",
      },
    };
  }
};

module.exports = currentEmail;
