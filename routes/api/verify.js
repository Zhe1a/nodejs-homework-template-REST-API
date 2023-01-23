const express = require("express");

const router = express.Router();

const verificationToken = require("../../models/email/verificationToken");
const currentEmail = require("../../models/email/currentEmail");
const validator = require("../../Middleware/validator")
const { emailSchema } = require("../../Schema/avatrsSchema");

router.get("/:", async (req, res, next) => {
  const verification = await verificationToken(req);
  res.json(verification);
});

router.post("/", validator(emailSchema), async (req, res, next) => {
  const verification = await currentEmail(req);
  res.json(verification);
});

module.exports = router;
