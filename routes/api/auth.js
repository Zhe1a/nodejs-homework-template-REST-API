const express = require("express");
const getAddUsers = require("../../models/signup");
const getUser = require("../../models/login");
const router = express.Router();

const { loginSchema, singnupSchema } = require("../../validation/authSchema");
const validator = require("../../Middleware/validator");
const logout = require("../../models/logaut");
const UserMiddleware = require("../../Middleware/UserMiddleware");
const current = require("../../models/current");

const loginUser = async (req, res, next) => {
  const login = await getUser(req);
  res.json(login);
};
router.post("/login", validator(loginSchema), loginUser);

const signup = async (req, res, next) => {
  const signup = await getAddUsers(req);
  res.json(signup);
};

router.post("/signup", validator(singnupSchema), signup);

router.post('/logaut',UserMiddleware, logout)
router.get("/current", UserMiddleware, current);
module.exports = router;
