const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const userScheme = require("../model/schems/user");
const base64UrlEncode = require("base64url");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = Router();
const User = mongoose.model("users", userScheme);

router.get("/", (req, res) => {
  res.render("getuser", {
    title: "Registration",
  });
});
router.post("/get", async (req, res) => {
  console.log(req.body);
  const user = await User.aggregate(
    [
      {
        $match: req.body,
      },
    ],
    {},
    (err) => {
      if (err) {
        res.send("Not found");
        res.statusCode = 404;
      }
    }
  );
  if (user.length > 0) {
    res.send(true);
    console.log(true);
  } else {
    console.log(false);
    res.send(false);
  }
});

router.post(
  "/save",
  express.urlencoded({ extended: false }),
  async (req, res) => {
    console.log(1);
    await User.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
        },
      },
      function (err, doc) {
        if (err) return res.send("false");
        res.send(true);
      }
    );
  }
);

module.exports = router;
