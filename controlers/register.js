const User = require("../models/user");

exports.form = (req, res) => {
    res.render('registerForm.ejs',{});
};

exports.submit = (req, res, next) => {
    User.findByEmail(req.body.dataForm.email, (err, user)=>{
        if (user) {
            User.create(req.body.user, (err)=>{
                if(err){
                    return new(err);
                }});
            };
            res.error("Такой пользователь в базе уже есть");
            res.redirect("/");
        };
    });
