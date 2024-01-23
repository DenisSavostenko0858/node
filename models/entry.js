const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "12309856",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database", err);
    return;
  }
  console.log("MySQL database подключен");
});
db.query(
  "CREATE TABLE IF NOT EXISTS entries(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, title VARCHAR(255), content TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
);

class Entry {
  constructor() {}

  static create(data) {
    const sql =
      "INSERT INTO entries (username, title, content, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";
    db.execute(sql, [data.username, data.title, data.content]);
  }

  static selectAll(cb) {
    db.query("SELECT * FROM entries", (err, results) => {
      if (err) {
        return cb(err);
      }
      cb(null, results);
    });
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

  static delete(entryId, cb) {
    const sql = "DELETE FROM entries WHERE id = ?";
    db.execute(sql, [entryId], (err, result) => {
      if (err) {
        return cb(err);
      }
      cb(null);
    });
  }

  static update(entryId, newData, cb) {
    const checkExistenceSql = "SELECT * FROM entries WHERE id = ?";
    db.query(checkExistenceSql, [entryId], (err, rows) => {
      if (err) {
        return cb(err);
      }

      if (rows.length === 0) {
        return cb(new Error("Entry not found"));
      }

      const updateSql =
        "UPDATE entries SET title = ?, content = ? WHERE id = ?";
      db.execute(
        updateSql,
        [newData.title, newData.content, entryId],
        (err, result) => {
          if (err) {
            return cb(err);
          }
          cb(null);
        }
      );
    });
  }
}

module.exports = Entry;
