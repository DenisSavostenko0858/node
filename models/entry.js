const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("test.sqlite");

const sql =
  "CREATE TABLE IF NOT EXISTS entries(id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT NOT NULL, title TEXT, content TEXT NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
db.run(sql);

class Entry {
  constructor() {}
  static create(data) {
    const sql =
      "INSERT INTO entries (username, title, content) VALUES (?, ?, ?)";
    db.run(sql, data.username, data.title, data.content);
  }
  static selectAll(cb) {
    db.all("SELECT * FROM entries", cb);
  }
  //Обновление данных
  static update(id, content, cb) {
    const sql = "UPDATE entries SET content = ? WHERE id = ?";
    db.run(sql, [content, id], cb);
  }
  static getEntryById(entryId, cb) {
    const sql = "SELECT * FROM entries WHERE id = ?";
    db.query(sql, [entryId], (err, result) => {
      if (err) {
        return cb(err);
      }
      cb(null, result[0]);
    });
  }
  // Удаление через чек бокс
  static delete(id, cb) {
    const sql = "DELETE FROM entries WHERE id = ?";
    db.run(sql, [id], cb);
  }
}

module.exports = Entry;
