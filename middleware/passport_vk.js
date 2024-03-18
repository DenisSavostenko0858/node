const VKontakteStrategy = require("passport-vkontakte").Strategy;
require("dotenv").config();

function passportFunctionVKontakte(passport) {
  passport.use(
    new VKontakteStrategy(
      {
        clientID: process.env.VK_CLIENT_ID,
        clientSecret: process.env.VK_CLIENT_SECRET,
        callbackURL: "http://localhost/auth/vkontakte/callback",
      },
      function (accessToken, refreshToken, params, profile, doneVK) {
        process.nextTick(function () {
          console.log(`Получили профиль от VK ${profile}`);
          return doneVK(null, profile);
        });
      }
    )
  );
}

module.exports = passportFunctionVKontakte;