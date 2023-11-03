const { error } = require("console");
const express = require("express")
const favicon = require("express-favicon");
const fs = require("fs")
const { appendFile } = require("fs");
const path = require("path");
const app = express();
const port = '3000';

app.use(express.json());
app.use(express.urlencoded((extended = true)));
app.use(express.static(path.join(__dirname,'public')))


//Иконка
console.log(__dirname + "/public/favicon.ico")
app.use(favicon(__dirname + "/public/favicon.ico"))


app.get('/', function (req, res){
    res.sendFile(__dirname + "/public/index.html");
})
app.get('/test', function (req, res){
    console.log("Прошли по пути test");
    res.end("Прошли по пути test");
})
app.post('/test', function (req, res){
    addLine("Пинганули")
    console.log("Прошли по пути post text");
    res.end("Прошли post text");
})

//Прослушиваем порт
app.listen(port, function(){
    console.log("Сервер запущен порт " + port);
    addLine("Server started");
});

//Создаем файл
function addLine(line){
    line = line + " timestamp: " + new Date().toLocaleString();
    fs.appendFile(
        path.join(__dirname + "/public/logger.txt"),
        line + "\n",
        (err) => {
           if(err) console.log(err) 
        }
    )
};