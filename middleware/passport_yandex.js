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

    passport.use(new YandexStrategy({
        clientID: YANDEX_CLIENT_ID,
        clientSecret: YANDEX_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/yandex/callback"
      },
      function(process,y0_AgAAAABaF4VnAAtluAAAAAD9JGxKAAC8KtAM0wpP6Y-Xf45BIv0bcaE6Eg, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
    
          // To keep the example simple, the user's Yandex profile is returned
          // to represent the logged-in user.  In a typical application, you would
          // want to associate the Yandex account with a user record in your
          // database, and return that user instead.
          console.info("Получили профиль от Яндекса: " + profile.name)
          return done(null, profile);
        });
      }
    ));
};

module.exports = passportFunction;