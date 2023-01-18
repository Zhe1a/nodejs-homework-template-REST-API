const User = require("../validation/users");


const logout = async (req, res) => {
    const { _id: owner } = req.user;
  
    await User.findByIdAndUpdate({ _id: owner }, { token: "" });
    res.status(204);
  };

  module.exports = logout