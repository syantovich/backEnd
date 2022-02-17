const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const userScheme = require("../model/schems/user");
const router = Router();
const User = mongoose.model("users", userScheme);
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const md5 = require("md5");

dotenv.config();
mongoose.connect("mongodb://localhost:27017/usersdb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
router.get("/", (req, res) => {
  res.render("registration", {
    title: "Registration",
  });
});

router.post("/", express.urlencoded({ extended: false }), async (req, res) => {
  const x = await bcrypt.hash(`${req.body.password}`, +process.env.SECRET_KEY);
  console.log(x);
  let body = {
    email: req.body.email,
    password: x,
  };
  await User.create(body, function (err, doc) {
    if (err) return res.send("false");
    res.send("true");
  });
});

module.exports = router;
