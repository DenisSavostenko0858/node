const register = require("../controllers/register");

module.exports = (req, res, next) => {
  const { name, email, password, age } = req.body;
  if (!name || !email || !password || !age) {
    res.status(400).send(`
    <div style="text-align:center">
      <h2>Заполните все поля!</h2>
      <a href="javascript:history.back()">Назад</a>
      </div>
    `);
    return;
  }
  if (!validatePassword(password)) {
    res.status(400).send(`
    <div style="text-align:center">
      <h2>Пароль должен содержать только латинские буквы и цифры, и быть не менее 6 символов длиной!</h2>
      <a href="javascript:history.back()">Назад</a>
      </div>
    `);
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send(`
    <div style="text-align:center">
      <h2>Некорректный адрес электронной почты!</h2>
      <a href="javascript:history.back()">Назад</a>
      </div>
    `);
    return;
  }
  next();
};

function validateEmail(email) {
  const emailPattern = /^\S+@\S+\.\S+$/;
  return emailPattern.test(email);
}

function validatePassword(pass) {
  const passPattern = /^[a-zA-Z0-9]{6,}$/;
  return passPattern.test(pass);
}
