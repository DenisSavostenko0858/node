const express = require('express');
const app = express();
const ejs = require('ejs');
const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT;
app.set('view engine', 'ejs');
const rout = require('./routers/index-router');
app.use(cookieParser());
const userSessions = require('./middleware/user_session');
const req = require('express/lib/request');

const passportFunctionYandex = require('./middleware/passport-yandex');
const passportFunctionGithub = require('./middleware/passport-github');
const passportFunctionGoogle = require('./middleware/passport-google');
const passportFunctionVKontakte = require('./middleware/passport-vk');

const sequelize = require('./models/db')

const passport = require('passport');
passportFunctionGithub(passport);
passportFunctionVKontakte(passport)
passportFunctionYandex(passport);
passportFunctionGoogle(passport);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(rout);
app.use(userSessions);

app.listen(PORT, async function(){
    await sequelize.sync({ force: true });
    console.log(`listening on http://localhost:${PORT}`);
    console.log("База данных sequelize синхронизирована");      
});