const User = require("../models/user");
exports.form = (req, res) => {
    res.render('registerForm.ejs',{});
};
exports.submit = (req, res, next) => {
    // if (ИГОРЬ В БАЗЕ ДАННЫХ ЕСТЬ?)
    User.create(req.body.user, cb);
};
