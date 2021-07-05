const path = require("path");
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");

const app = express();
const port = 3001;

const sequelize = reauire("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "this is a secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    dn: sequelize,
  }),
};

app.use(session(sess));

app.engine(
  "handlebars",
  handlebars({
    layoutDir: `${__dirname}/views/layouts`,
  })
);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("homepage");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
