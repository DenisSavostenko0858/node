// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(test.db);
// const bcrypt = require("bcrypt")

// const sql = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, age INTEGER NOT NULL)";

// db.run(sql);

// class User{
//     constructor(){};

//     static async create(dataForm, cb){
//         try {
//         const salt = await bcrypt.genSalt(10);

//         const hash = await bcrypt.hash(dataForm, password, salt);
//         const sql1 = "INSERT INTO users (name ,email, password, age) VALUES (?, ?, ?, ?)";
    
//         db.run(sql1, dataForm.email, hash, dataForm.age, cb);        

//         } catch (err){
//             if(err) return next(err);
//         };
//     };

//     static fiendByEmail(email, cb){
//         db.get("SELECT * FROM users WHERE email = ?", email, cb);
//     };

//     static authentificate(dataForm, cb){
//         User.fiendByEmail(dataForm.email, (err, user) =>{
//             if(err) return cb(err);
//             if (!user) return cb(err);
//         });
//         const result = bcrypt.compare(dataForm, password, user, password);
//         if (result) return cb(user);
//     };
// };

// module.exports = User;