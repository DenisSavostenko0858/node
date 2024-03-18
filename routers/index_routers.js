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
    res.redirect('/entries');
  });
router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] })
);

router.get('/auth/google/callback', 
  passport.authenticate( 'google', {
    successRedirect: '/entries',
    failureRedirect: '/login'
}));
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/entries");
  }
);
router.get("/auth/vkontakte", passport.authenticate("vkontakte"));
router.get(
  "/auth/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: "/entries",
    failureRedirect: "/login",
  })
);
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
