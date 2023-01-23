const getCurrent = async (req, res) => {
  const { name, email, _id, subscription, avatarURL } = req.user;
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
      id: _id,
      name,
      avatarURL,
      email,
      subscription,
    },
  };
};

module.exports = getCurrent;
