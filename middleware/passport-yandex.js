const YandexStrategy = require("passport-yandex").Strategy;
require('dotenv').config();

function passportFunctionYandex(passport){
    passport.serializeUser(function(user, done) {
      const newUser = {};
      newUser.id = user.id;
      newUser.email = user.emails[0].value;
      newUser.name =  user.displayName;
      done(null, newUser);
    });
      
      passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    const accessToken = process.env.apptokenyandex; 
    passport.use(
      new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:80/auth/yandex/callback",
        apptokenyandex: process.env.apptokenyandex
      },
      function(accessToken, refreshToken, profile, done){
           console.log("Получили профиль от Яндекса: " + profile.displayName);
           return done(null, profile);
          }
        )
        )
}

module.exports = passportFunctionYandex;
