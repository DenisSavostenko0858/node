const User = require("../models/user");

exports.form = (req, res) => {
  res.render("loginForm", { title: "Login" });
};

exports.submit = (req, res, next) => {
  User.authentificate(req.body.loginForm, (error, data) => {
    if (error) return next(error);
    if (!data) {
      res.error("Логин или пароль не верны");
      // console.log("Логин или пароль не верны");
      res.send(` <div 
      style="
      display: flex;
      justify-content: center;
      align-items:center;
      flex-direction: column;
  
      background-color: #aacef0; 
      color: white;
      font-family: 'Lucida Sans';
      width: 600px;
      height: 300px;
      margin-left: 35%;
      margin-top: 10%">
        <h2>Логин или пароль не верен</h2>
        <h2>Попробуйте снова</h2>
        <a href="javascript:history.back()"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          margin-top: 40px;
          width: 80px;
          height: 30px;
          border: none;
          background-color: blue;
          color: white;
        " >Назад</a>
        </div>
      `);
      // res.redirect("back");
    } else {
      req.session.userEmail = data.email;
      req.session.userName = data.name;
      res.redirect("/");
    }
  });
};

exports.logout = function (req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
