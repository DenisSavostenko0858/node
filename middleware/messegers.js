const express = require("express");
function message(req){
    return (msg, type) => {
        type = type || "info";
        let sess = req.sessinon;
        sess.messages = sess.messages || {};
        sess.messages.push({type: type, string: msg});
    }
}

module.exports = function(req, res, next){
    res.messagePush = message(req);
    res.error = (msg) => {
        return res.messagePush(msg, "error");
    }
    res.locals.messages = req.session.messages || {};
    res.locals.removeMessage = function (){
        res.sessinon.messages = {};
    }
    next();
}