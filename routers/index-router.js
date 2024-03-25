const express = require('express');
const router = express();
require('dotenv').config();
const ejs = require('ejs');
const passport = require('passport');

const register = require('../controllers/register');
const login = require('../controllers/login');


router.get('/', function(req, res) {
    res.render('../views/homepages')
});

router.get('/about', function(req, res) {
    res.render('../views/about')
});

router.get('/register', function(req, res) {
    res.render('../views/registerUser')
});
router.post('/register', register.submitIsForm);

router.get('/login', function(req, res) {
    res.render('../views/loginUser')
});
router.post('/login', login.submit);

router.get('/entry', function(req, res){
    const userName = req.query.userName;
    res.render('../views/entrypages',{ userName: userName });
})

router.get('/auth/yandex',
  passport.authenticate('yandex'),
  function(req, res){
  });

router.get('/auth/yandex/callback', 
  passport.authenticate('yandex', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/entry');
  });

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));
 
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/entry');
  });

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
  
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/entry",
    failureRedirect: "/login",
  })
);

router.get("/auth/vkontakte", passport.authenticate("vkontakte"));
router.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: "/entry",
    failureRedirect: "/login",
  })
);

router.use((req, res, next) => {
    res.render('../views/error')
  });

module.exports = router;