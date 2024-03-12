const express = require("express");
const router = express.Router();
const passport = require("passport");

const register = require("../controllers/register");
const login = require("../controllers/login");
const entries = require("../controllers/entries");
const validation = require("../middleware/validate_form");
const esureAuthenticated = require("../middleware/isAuthenticated")

router.get("/", (req, res) => {
  res.render("home", {
    title: "Главная",
  });
});

router.get("/entries", entries.list);
// esureAuthenticated вставить
router.get("/post" ,entries.form);
router.post("/post", passport.authenticate("jwt", {session: false}),entries.submit);

router.get("/update/:id", entries.updateForm);
router.post("/update/:id", entries.updateSubmit);

router.get("/delete/:id", entries.delete);

router.get("/register", register.form);
router.post("/register", validation, register.submit);

router.get('/auth/yandex',
  passport.authenticate('yandex'),
  function(req, res){
  });

router.get('/auth/yandex/callback', 
  passport.authenticate('yandex', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] })
);

router.get('/auth/google/callback', 
  passport.authenticate( 'google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get("/login", login.form);
router.post("/login", login.submit);
router.get("/logout", login.logout);

router.get("*", (req, res, next) => {
  const error = new Error("Страница не найдена");
  error.statusCode = 404;
  next(error);
});

router.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .render("error", { title: "Ошибка", message: error.message });
});

module.exports = router;
