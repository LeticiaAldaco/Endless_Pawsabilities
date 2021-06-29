const passport = require("passport");
const passportJwt = require("passport-jwt");
const StrategyJwt = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require("../models/user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = function (passport) {
  passport.use(
    new StrategyJwt(opts, (jwt_payload, done) => {
      User.findOne({ where: { id: jwt_payload.id } })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return console.log(err);
        });
    })
  );
};

//LOCAL SIGNIN
passport.use(
  "local-signin",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email

      usernameField: "email",

      passwordField: "password",

      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },

    function (req, email, password, done) {
      var Auth = auth;

      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      };
      console.log("logged to", email);
      Auth.findOne({
        where: {
          email: email,
        },
      })
        .then(function (user) {
          console.log(user);
          if (!user) {
            return done(null, false, {
              message: "Email does not exist",
            });
          }

          if (!isValidPassword(user.password, password)) {
            return done(null, false, {
              message: "Incorrect password.",
            });
          }

          var userinfo = user.get();
          return done(null, userinfo);
        })
        .catch(function (err) {
          console.log("Error:", err);

          return done(null, false, {
            message: "Something went wrong with your Signin",
          });
        });
    }
  )
);

//serialize
passport.serializeUser(function (auth, done) {
  done(null, auth.id);
});

// deserialize user
passport.deserializeUser(function (id, done) {
  Auth.findById(id).then(function (user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});