const Entry = require('../models/entry')

exports.list = (req, res) => {
    Entry.selectAll((err, entries) => {
     if(err) return next(err);   
     res.render('entries.ejs',{title:'list', entries: entries});
    })};
exports.form = (req, res, next) => {
    res.render("post", {title: 'post'});
};
exports.submit = (req, res, next) => {
    try{
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;

    const entry = {
        username: username,
        title: data.title,
        content: data.content
    };
    Entry.create(entry);
    res.redirect("/");
    } catch(err){
        return next(err);
    };
};