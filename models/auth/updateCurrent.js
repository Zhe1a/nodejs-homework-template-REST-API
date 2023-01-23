const User = require("../../validation/users");


const updateCurrent = async (id, avatarURL) => {
    await User.findByIdAndUpdate({ id }, { avatarURL: avatarURL });
    res.status(204).end();
    
  };

  module.exports = updateCurrent