const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const userScheme = require("../model/schems/user");
const router = Router();
const User = mongoose.model("users", userScheme);
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

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
  let body = {
    email: req.body.email,
    password: x,
  };

  await User.create(body, function (err, doc) {
    if (err) {
      res.status(400);
      return res.send(false);
    }
    res.send(true);
  });
});

module.exports = router;
