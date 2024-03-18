const GithubStrategy = require("passport-github2").Strategy;
require('dotenv').config();

function passportFunctionGithub(passport) {
  passport.serializeUser(function (user, doneGIT) {
    console.log(user);
    console.log("Github serialize");
    const email = function () {
      if (user.provider == "google") {
        return user.email;
      } else if (user.provider == "yandex") {
        return user.emails[0].value;
      } else if (user.provider == "github") {
        return user._json.email ? user._json.email : "github.email@gmail.com";
      } else {
        return "vk.email@gmail.com";
      }
    };
    const newUser = {
      id: user.id,
      name: user.displayName,
      email: email(),
    };
    doneGIT(null, newUser);
  });

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECKRET,
        callbackURL: "http://localhost3000/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          logger.info(`Получили профиль от GitHub ${profile.displayName}`);
          return done(null, profile);
        });
      }
    )
  );
}

module.exports = passportFunctionGithub;