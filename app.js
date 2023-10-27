const express = require("express")
const favicon = require("express-favicon");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname,'public')))

console.log(__dirname + "/public/favicon.ico")


app.use(favicon(__dirname + "/public/favicon.ico"))
const port = '3000';

app.get('/', function (req, res){
    res.sendFile(__dirname + "/public/index.html");
    // console.log(req) //Вывод к нам в консоль не в браузер
})

app.listen(port,() => {console.log('listening on port: ' + port);});