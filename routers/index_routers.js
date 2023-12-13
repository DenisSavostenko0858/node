const express = require('express');
const app = express()
const router = express.Router();
const register = require('../controlers/register')
const login = require('../controlers/login')
const entries = require('../controlers/entries')

router.get('/',entries.list);
router.post('/entry', entries.form);
router.post('/post', entries.submit);
// Страница после входа         

router.get('/login',login.form);
router.post('/login', login.submit);
// Главная страница добавить кнопки входа и регистрации и блок для вывода данных пользователя
router.get('/register',register.form);
router.post('/register', register.submit);

router.post('/logout', login.logout);

module.exports = router;