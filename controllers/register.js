const { User } = require("../models/db");
const bcrypt = require('bcrypt');

exports.submitIsForm = async (req, res, next) => {
  console.log(req.body);

  if (!req.body || !req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).send("Некорректные данные формы");
  }

  try {
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Вы уже зарегистрированы</h3> <a href='/register'>попробуйте войти</a></div>");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username
      });
      req.session.userEmail = req.body.email;
      req.session.userName = req.body.username;
      console.log("Пользователь создан");
      if (req.session.userEmail && req.session.userName) {
        res.redirect("/entry");
      } else {
        return res.status(500).send("Ошибка при установке данных в сессию");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Ошибка сервера");
  }
}