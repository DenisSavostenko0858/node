const User = require('./userdb');

exports.submitIsForm = (req, res, next) => {
  console.log(req.body)
  if (!req.body || !req.body.email) {
    return res.status(400).send("Некорректные данные формы");
  }
  User.findByEmail(req.body.email, (error, user) => {
    if (error) return next(error);
    if (user) {
      return res.send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Вы уже зарегистрированы</h3> <a href='/register'>попробуйте войти</a></div>");
    } else {
      User.create(req.body, (error) => {
        if (error) return next(error);
        req.session.userEmail = req.body.email;
        req.session.userName = req.body.name;
        console.log("Пользователь создан");
        if (req.session.userEmail && req.session.userName) {
          res.redirect("/entry");
        } else {
          return res.status(500).send("Ошибка при установке данных в сессию");
        }
      });
    }
  });
};