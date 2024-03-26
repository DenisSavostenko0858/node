const {Entry} = require("./postdb");

// exports.list = (req, res, next) => {
//   Entry.selectAll((err, entries) => {
//     if (err) return next(err);
//     res.render("entry", { title: "Entries", entries: entries });
//   });
// };
exports.list = async (req, res, next) => {
  try {
    const entries = await Entry.fiendAll();
    res.render("entry", { title: "Entries", entries: entries });
  }catch(err) {
    return next(err)
  }
};

exports.form = (req, res, next) => {
  res.render("cratepost");
};
// exports.submit = (req, res, next) => {
//   try {
//     const username = req.user ? req.user.name : null;
//     const data = req.body.entry;
//     const entry = {
//       username: data.username,
//       title: data.title,
//       content: data.content,
//       timestamp: data.timestamp
//     };

//     Entry.create(entry);
//     res.redirect("/");

//    }catch (err) {
//     return next(err);
//   }
// };
exports.submit = async (req, res, next) => {
  try {
    const username = req.user ? req.user.name : null;
    const data = req.body.entry;
    const entry = {
      username: data.username,
      title: data.title,
      content: data.content,
      timestamp: data.timestamp
    };
    await Entry.create(entry);
    res.redirect("/");
   }catch (err) {
    return next(err);
  }
};
// exports.delete = (req, res, next) => {
//   const entryIds = req.body.entryIds;
  
//   Entry.delete(entryIds, (err) => {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// };
exports.delete = async (req, res, next) => {
  try{
    const entryIds = req.body.entryIds;
  
    await Entry.destroy({
      where: {
        id: entryIds 
      }
    });
  }catch(err) {
    return next(err)
  }
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
// exports.updateSubmit = (req, res, next) => {
//   const entryId = req.params.id;
//   const newData = {
//     title: req.body.entry.title,
//     content: req.body.entry.content,
//   };

//   Entry.update(entryId, newData, (err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/entries");
//   });
// };
exports.updateSubmit = async (req, res, next) => {
  const entryId = req.params.id;
  const newData = {
    title: req.body.entry.title,
    content: req.body.entry.content,
  };

  await Entry.update(entryId, newData, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/entries");
  });
};