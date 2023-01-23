const express = require("express");


const router = express.Router();

const verificationToken = require("../../models/email/verificationToken");
const currentEmail = require("../../");

router.get("/:", async (req, res, next) => {
  const verification = await verificationToken(req);
  res.json(verification);
});

router.post("/", async (req, res, next) => {
  const verification = await currentEmail(req);
  res.json(verification);
});


module.exports = router