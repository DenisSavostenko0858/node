const YandexStrategy = require("passport-yandex").Strategy;
const User = require("../models/user");
require('dotenv').config();

function passportFunction(passport){

    passport.serializeUser(function(user, done) {
      const newUser = {};
      newUser.id = user.id;
      newUser.email = user.emails[0].value;
      newUser.name =  user.displayName;
      newUser.birthday = user.birthday ? date.now() - user.birthday : 0;
      done(null, newUser);
    });
      
      passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    // const yandexclientid = "4c1ddb6869ee47b483fa331584e6947a";
    // const yandexcliensecret = "48f86bf77b3b432eb9d11160c7814158";
    const apptokenyandex = process.env.apptokenyandex; 
    passport.use(
      new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/yandex/callback",
      },
      function(
        apptokenyandex,
         refreshToken, 
         profile, 
         done
         ){
           console.info("Получили профиль от Яндекса: " + profile.name);
           return done(null, profile);
          }
        )
        )
}

module.exports = passportFunction;