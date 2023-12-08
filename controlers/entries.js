const User = require("../models/user");

exports.list = (req, res) => {
    res.render('entries.ejs',{title:'list'});
};