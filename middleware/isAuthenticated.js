const express = require("express");

module.exports = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  logger.info("Работает клиент от Yandex");
  res.redirect("/login");
};