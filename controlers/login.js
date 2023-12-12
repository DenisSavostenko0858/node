const User = require("../models/user");

// login
exports.form = (req, res) => {
    res.render('loginForm.ejs',{});
};
exports.submit = (req, res, next) => {};
// Дописать функцию