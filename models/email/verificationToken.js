const User = require("../../validation/users");

const verificationToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.body;
    const user = await User.findOne({ verificationToken });
    const { _id } = user;
    await User.findByIdAndUpdate(
      { _id },
      { verificationToken: null },
      { verify: true }
    );

    return {
      Status: 200,
      ResponseBody: {
        message: "Verification successful",
      },
    };
  } catch (error) {
    return {
      Status: 404,
      ResponseBody: {
        message: "User not found",
      },
    };
  }
};

module.exports = verificationToken;
