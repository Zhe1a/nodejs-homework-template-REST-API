const User = require("../../validation/users");


const logout = async (req, res) => {
    const { _id } = req.user;
  
    await User.findByIdAndUpdate({ _id }, { token: "" });
    res.status(204).end();
    
  };

  module.exports = logout