const User = require("../../validation/users");
const confirmation = require("./confirmation");

const currentEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return {
        Status: 400,
        message: "missing required field email",
      };
    }
    const user = await User.findOne({ email });

    const { verificationToken, verify } = user;
    if (verify) {
      return {
        Status: 400,
        message: "Verification has already been passed",
      };
    }
    await confirmation(req.headers, email, verificationToken);
    return {
      Status: 200,
      message: "Verification email sent",
    };
  } catch (error) {
    next(error);
  }
};

module.exports = currentEmail;
