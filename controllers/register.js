const User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.form = (req, res) => {
  res.render("registerForm", { title: "Регистрация" });
};

exports.submit = (req, res, next) => {
  User.findByEmail(req.body.email, (error, user) => {
    if (error) return next(error);
    if (user) {
      console.log("Такой пользователь в базе уже существует");
      res.redirect("/");
    } else {
      User.create(req.body, (err) => {
        if (err) return next(err);
        req.session.userEmail = req.body.email;
        req.session.userName = req.body.name;
        res.redirect("/");
      });
      //JsonWebToken
      const token = jwt.sign({
        username: req.body.name
      },
      // {expiresIn: jwt_time},
        'secret', { expiresIn: 60 * 60 });
        res.cookie("jwt", token,{
          httpOnly: true,
          // masAge: jwt_time,
        });
        console.info("Токен регистрации у пользователя "+ data.name + " обновлен: " + token);
        res.redirect("/")
    }
  });
};
