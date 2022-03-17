const express = require("express");
const mongoose = require("mongoose");
const Handlebars = require("express-handlebars");
const homeRouts = require("./routs/home");
const regRouts = require("./routs/registration");
const bodyParser = require("body-parser");
const getRouts = require("./routs/getuser");
const autorizeRouts = require("./routs/autorization");
const cinemasRouts = require("./routs/cinemas");
const hallsRouts = require("./routs/halls");
const movieRouts = require("./routs/movies");
const sessionRouts = require("./routs/sessions");
const movieInfoRouts = require("./routs/movieinfo");
const socketsInit = require("./socket/socket.js").socketsInit;
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/usersdb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const app = express();

const hbs = Handlebars.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "100mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/", homeRouts);
app.use("/registration", regRouts);
app.use("/getuser", getRouts);
app.use("/authenticate", autorizeRouts);
app.use("/cinemas", cinemasRouts);
app.use("/halls", hallsRouts);
app.use("/movie", movieRouts);
app.use("/movieinfo", movieInfoRouts);
app.use("/session", sessionRouts);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, (err) => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  serverClient: true,
  cors: {
    origin: "*",
  },
});
socketsInit(io);
