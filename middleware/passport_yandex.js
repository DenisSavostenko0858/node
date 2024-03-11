const YandexStrategy = require("passport-yandex").Strategy;
const User = require("../models/user");
require('dotenv').config();

function passportFunction(passport){

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
      passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(
      new YandexStrategy({
        clientID: "4c1ddb6869ee47b483fa331584e6947a",
        clientSecret: "48f86bf77b3b432eb9d11160c7814158",
        callbackURL: "http://127.0.0.1:3000/auth/yandex/callback"
      },
      function(
        y0_AgAAAABaF4VnAAtluAAAAAD9JGxKAAC8KtAM0wpP6YXf45BIv0bcaE6Eg,
         refreshToken, 
         profile, 
         done){
          console.info("Получили профиль от Яндекса: " + profile.name)
          return done(null, profile)
        }
        )
    )
}

module.exports = passportFunction;