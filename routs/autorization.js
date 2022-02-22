const { Router } = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userScheme = require("../model/schems/user");
const User = mongoose.model("users", userScheme);

const router = Router();
let data;
router.post("/", async function (req, res) {
  data = await User.find({});
  console.log(data);
  let employee = await _.find(data, { email: req.body.email });
  console.log(employee);
  if (
    employee === undefined ||
    !(await bcrypt.compare(req.body.password, employee.password))
  ) {
    res
      .status(401)
      .send({ success: false, message: "Bad username/password combination. " });
  } else {
    let payload = { email: employee.email };
    let token = jwt.sign(payload, "i7ufdsS", { expiresIn: 10 });
    res.send(token);
  }
});
// middleware for token check
function checkToken(req, res, next) {
  let token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "i7ufdsS", function (err, decoded) {
      if (err) {
        res
          .status(401)
          .json({ success: false, message: "Failed to authenticate token." });
      } else {
        res.send(decoded);
        // some business logic here
        next();
      }
    });
  } else {
  }
}

router.get("/employees", checkToken, function (req, res) {});
module.exports = router;
