const express = require('express');
const app = express()
const router = express.Router();
const register = require('../controlers/register')

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname + "/public/index.html"))
});
// Главная страница гостевая

router.get('/entries',entries.list);
// Страница после входа
router.post('/entry', entry.form);

router.get('/login',login.form);
router.post('/login', login.submit);
// Создать Login.ejs по аналогу с регистрацией
// Главная страница добавить кнопки входа и регистрации и блок для вывода данных пользователя
router.get('/register',register.form);
router.post('/register', register.submit);

module.exports = router;