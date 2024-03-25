const User = require("./userdb");

exports.submit = (req, res, next) => {
    User.authentificate(req.body, (error, data) => {
      if (error) return next(error);
      if (!data) {
        res.send("<div style='display:flex; align-items:center; justify-content: center; flex-direction: column; font-size: 20px'><h3>Логин или пароль не верны</h3> <a href='/login'>попробуйте еще раз</a></div>");
      } else {
        const userName = data.username;
        req.session = req.session || {}; 
        req.session.userEmail = data.email;
        req.session.userName = data.username; 
        res.redirect(302, `/entry?userName=${userName}`);
      }
    });
  };

exports.logout = function (req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};