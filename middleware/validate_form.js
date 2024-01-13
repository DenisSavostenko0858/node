const register = require("../controllers/register");

module.exports = (req, res, next) => {
  const { name, email, password, age } = req.body;
  if (!name || !email || !password || !age) {
    res.status(400).send(`
    <div 
    style="
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;

    background-color: #aacef0; 
    color: white;
    font-family: 'Lucida Sans';
    width: 600px;
    height: 300px;
    margin-left: 35%;
    margin-top: 10%">
      <h2>Заполните все поля!</h2>
      <a href="javascript:history.back()">Назад</a>
      </div>
    `);
    return;
  }
  if (!validatePassword(password)) {
    res.status(400).send(`
    <div 
    style="
    display: flex;
    justify-content: center;
    align-items:center;
    text-align: center;
    flex-direction: column;

    background-color: #aacef0; 
    color: white;
    font-family: 'Lucida Sans';
    width: 600px;
    height: 300px;
    margin-left: 35%;
    margin-top: 10%">
      <h2>Пароль должен содержать латинские буквы, цифры и быть длиной не менее 6 символов</h2>
      <a href="javascript:history.back()">Назад</a>
      </div>
    `);
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send(`
    <div 
    style="
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;

    background-color: #aacef0; 
    color: white;
    font-family: 'Lucida Sans';
    width: 600px;
    height: 300px;
    margin-left: 35%;
    margin-top: 10%">
      <h2>Некорректный адрес электронной почты</h2>
      <h2>Попробуйте еще раз</h2>
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
// Символы до @ затем точка и далее символны

function validatePassword(pass) {
  const passPattern = /^[a-zA-Z0-9]{6,}$/;
  return passPattern.test(pass);
}
// Латиница в разных регистрах и не менее 6
