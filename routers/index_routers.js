const express = require('express');
const app = express()
const router = express.Router();
const register = require('../controlers/register')
const login = require('../controlers/login')

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname + "/public/index.html"))
});
// Главная страница гостевая

// router.get('/entries',entries.list);
// Страница после входа         
// router.post('/entry', entry.form);

router.get('/login',login.form);
// router.post('/login', login.submit);
// Главная страница добавить кнопки входа и регистрации и блок для вывода данных пользователя
router.get('/register',register.form);
router.post('/register', register.submit);

module.exports = router;