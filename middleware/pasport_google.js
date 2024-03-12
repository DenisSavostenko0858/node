const Strategy = require("passport-yandex").Strategy;
require('dotenv').config();

function passportFunctionGoogle(passport){
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
    const accessToken = process.env.apptokenyandex; 
    passport.use(
      new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/yandex/callback",
        apptokenyandex: process.env.apptokenyandex
      },
      function(accessToken, refreshToken, profile, done){
           console.log("Получили профиль от Яндекса: " + profile.name);
           return done(null, profile);
          }
        )
        )
}

module.exports = passportFunctionGoogle;