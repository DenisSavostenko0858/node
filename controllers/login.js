const User = require("../models/user");
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.form = (req, res) => {
  res.render("loginForm", { title: "Вход" });
};

exports.submit = (req, res, next) => {
  User.authentificate(req.body.loginForm, (error, data) => {
    if (error) return next(error);
    if (!data) {
      console.log("Имя или пароль неверный");
      res.redirect("back");
    } else {
      req.session.userEmail = data.email;
      req.session.userName = data.name;
      const token = jwt.sign({
        username: req.body.name
      },
      // {expiresIn: jwt_time},
        'secret', { expiresIn: 60 * 60 });
        res.cookie("jwt", token,{
          httpOnly: true,
          masAge: 600000,
        });
        console.info("Токен авторизации у пользователя "+ data.name + " обновлен: " + token);
      res.redirect("/");
    }
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
