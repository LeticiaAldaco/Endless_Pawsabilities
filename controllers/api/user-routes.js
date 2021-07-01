const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = requre("jsonwwebtoken");

//Registration form entry for the db
const User = require("../../models/user");

const router = require("express").Router();

router.get("/", (req, res) => {
  User.findAll({
    where: {
      email: req.params.email,
    },
  }).then((dbUserData) => {
    res.json(dbUserData);
  });
});

// router.get('/', (req, res) => {
//     Post.findAll({
//         attributes: [
//             'email',
//             'password'
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['userEmail', 'userPsw']
//             }
//         ]
//     }).then(dbPostData => {
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('homepage', {
//             posts,
//             loggedIn: req.session.loggedIn
//         });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

//GET session login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
//GET signup

router.get("/login-signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
  res.render("signup");
});

// GET post by id
router.post("/:login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this email" });
        return;
      }
      res.render("/homepage", {
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;

//Encryption code for the database
