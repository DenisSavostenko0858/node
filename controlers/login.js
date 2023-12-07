const User = require("../models/user");

exports.form = (req, res) => {
    res.render('loginForm.ejs',{});
};