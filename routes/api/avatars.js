const express = require("express");
const upload = require("../../Middleware/multer");
const UserMiddleware = require("../../Middleware/UserMiddleware");

const router = express.Router();

const validator = require("../../Middleware/validator");
const avatarPost = require("../../models/avatar/avatarsPost");
const avatarsSchema = require("../../Schema/avatrsSchema");

const avatars = async (req, res, next) => {
  const { headers, body, file, user } = req;
  console.log(body);
  const avatar = await avatarPost(req);

  return res.json(avatar);
};

router.post(
  "/",
  UserMiddleware,
  validator(avatarsSchema),
  upload.single("file"),
  avatars
);

module.exports = router;
