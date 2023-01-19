const express = require("express");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

const validator = require("../../Middleware/validator");
const avatarGet = require("../../models/avatar/avatar");

const avatarsUser = async (req, res, next) => {
  const avatar = await avatarGet(req);
  return res.json(avatar);
};
router.get("/a", avatarsUser);

const avatarsPost = async (req, res, next) => {
  const avatar = await avatarUser(req);
  return res.json(avatar);
};
router.post("/avatars", avatarsPost);

module.exports = router;
