const express = require("express")
const favicon = require("express-favicon");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded((extended = true)));

app.use(express.static(path.join(__dirname,'public')))

console.log(__dirname + "/public/favicon.ico")

// Задание
const fs = require("fs");
fs.writeFile("hello.txt", "localhost:3000", function(error){
    if(error) throw error; 
    console.log("Файл создан. Логируем ping по адресу:");
    let data = fs.readFileSync("hello.txt", "utf8");
    console.log(data);  
});

app.use(favicon(__dirname + "/public/favicon.ico"))
const port = '3000';

app.get('/', function (req, res){
    res.sendFile(__dirname + "/public/index.html");
    // console.log(req) //Вывод к нам в консоль не в браузер
})
app.get('/test', function (req, res){
    console.log("Прошли по пути test");
    res.end("Прошли по пути test");
})
app.post('/test', function (req, res){
    console.log(req.body);
    console.log("Прошли по пути post");
    res.end("Прошли по пути post");
})


app.listen(port,() => {console.log('listening on port: ' + port);});