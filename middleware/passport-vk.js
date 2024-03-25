const VKontakteStrategy = require("passport-vkontakte").Strategy;
require("dotenv").config();

function passportFunctionVKontakte(passport) {
  passport.serializeUser(function (user, done) {
    const newUser = {};
    (newUser.id = user.id),
      (newUser.email = user.emails[0].value),
      (newUser.name = user.displayName),
      done(null, newUser);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  passport.use(
    new VKontakteStrategy(
      {
        clientID: process.env.VK_CLIENT_ID,
        clientSecret: process.env.VK_CLIENT_SECRET,
        callbackURL: "http://localhost/auth/vkontakte/callback",
      },
      function (accessToken, refreshToken, params, profile, doneVK) {
        process.nextTick(function () {
          console.log(`Получили профиль от VK ${profile.displayName}`);
          return doneVK(null, profile);
        });
      }
    )
  );
}

module.exports = passportFunctionVKontakte;