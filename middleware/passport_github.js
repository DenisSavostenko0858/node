const GithubStrategy = require("passport-github2").Strategy;
require('dotenv').config();

function passportFunctionGithub(passport){
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
    passport.use(
      new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECKRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, done) {
           console.log("Получили профиль от github: " + profile.name);
           return done(null, profile);
          }
        )
        )
}

module.exports = passportFunctionGithub;