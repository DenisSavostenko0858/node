// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./database/users.db');

// db.serialize(() => {
//   const sql =
//     "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)";
//   db.run(sql);
// });

// class User {
//   constructor() {}

//   static async create(dataIsForm, next, cb) {
//     try {
//       const sql3 = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
//       db.run(sql3, dataIsForm.username, dataIsForm.email, dataIsForm.password);
//     } catch (error) {
//       if (error) return next(error);
//     }
//   }

//   static findByEmail(email, cb) {
//     db.get("SELECT * FROM users WHERE email = ?", [email], cb);
//   }

//   static authentificate(dataIsForm, cb) {
//     User.findByEmail(dataIsForm.email, (error, user) => {
//       if (error) return cb(error);
//       if (!user) return cb();
//       if (dataIsForm.password === user.password) { 
//         cb(null, user); 
//       } else { 
//         cb(); 
//       }
//     });
//   }

// }

// module.exports = User;