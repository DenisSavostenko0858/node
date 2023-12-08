const User = require("../models/user");

exports.form = (req, res) => {
    res.render('registerForm.ejs',{title: 'Register'});
};

exports.submit = (req, res, next) => {
    User.findByEmail(req.body.dataForm.email, (err, user)=>{
        if (err) return next(err);
        if (user) {
            console.log("Такой пользователь в базе уже есть");
        } else{
            User.create(req.body.user, (err)=>{
                if(err){
                    return new(err);
                }});
        };
            res.redirect("/");
        });
};
