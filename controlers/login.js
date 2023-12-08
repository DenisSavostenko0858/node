const User = require("../models/user");

// login
exports.form = (req, res) => {
    res.render('loginForm.ejs',{});
};
