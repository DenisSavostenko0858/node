const Sequelize  = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/usercontent.db'
});

// orm class entry
const Entry = sequelize.define(
    "entries",{
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoincrement: true,
        },
        username: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        content:{
            type: Sequelize.STRING,
        },
    }
)
// orm class user
const User = sequelize.define(
    "users",{
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            autoincrement: true,
        },
        username:{
            type: Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
        },
        password:{
            type: Sequelize.STRING,
        }
    }
)
module.exports = User;
