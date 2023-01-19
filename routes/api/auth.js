const express = require("express");
const getAddUsers = require("../../models/auth/signup");
const getUser = require("../../models/auth/login");
const router = express.Router();

const { loginSchema, singnupSchema } = require("../../Schema/authSchema");
const validator = require("../../Middleware/validator");
const logout = require("../../models/auth/logaut");
const UserMiddleware = require("../../Middleware/UserMiddleware");
const getCurrent = require("../../models/auth/getCurrent");

const loginUser = async (req, res, next) => {
  const login = await getUser(req);
  UserMiddleware(login)
  res.json(login);
};
router.post("/login", validator(loginSchema), loginUser);

const signup = async (req, res, next) => {
  const signup = await getAddUsers(req);
  res.json(signup);
};

router.post("/signup", validator(singnupSchema), signup);

router.post('/logaut',UserMiddleware, logout)

const current = async (req, res, next) => {
  const curren = await getCurrent(req);
  res.json(curren);
};
router.get("/current", UserMiddleware, current);


module.exports = router;
