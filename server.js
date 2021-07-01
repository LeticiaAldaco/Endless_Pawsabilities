// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const sequelize = require("./config/connection");
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const helpers = require('./utils/helpers');
// const routes = require('./controllers')

// const app = express();
// const PORT = process.env.PORT || 3001;
// const hbs = exphbs.create({ helpers });
// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });

const path = require("path");
const express = require("express");
const app = express();
const port = 3001;

const handlebars = require("express-handlebars");
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
