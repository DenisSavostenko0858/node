const Entry = require("../models/entry");

exports.list = (req, res, next) => {
  Entry.selectAll((err, entries) => {
    if (err) return next(err);

    const userData = req.user;
    res.render("entries", { title: "Посты", entries: entries, user: userData });
  });
};

exports.form = (req, res) => {
  res.render("post", { title: "Создать пост" });
};

exports.submit = (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;

    const entry = {
      username: username,
      title: data.title,
      content: data.content,
    };

    Entry.create(entry);
    res.redirect("/entries");
  } catch (err) {
    return next(err);
  }
};

exports.delete = (req, res, next) => {
  const entryId = req.params.id;

  Entry.delete(entryId, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/entries");
  });
};

exports.updateForm = (req, res) => {
  const entryId = req.params.id;
  Entry.getEntryById(entryId, (err, entry) => {
    if (err) {
      return res.redirect("/entries");
    }
    res.render("update", { title: "Изменить пост", entry: entry });
  });
};

exports.updateSubmit = (req, res, next) => {
  const entryId = req.params.id;
  const newData = {
    title: req.body.entry.title,
    content: req.body.entry.content,
  };

  Entry.update(entryId, newData, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/entries");
  });
};
