const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  if (!req.user) {
    return {
      status: "success",
      code: 401,
      ResponseBody: {
        message: "Not authorized",
      },
    };
  }
  return {
    status: "success",
    code: 202,
    ResponseBody: {
      email,
      subscription,
    },
  };
};

module.exports = getCurrent;
