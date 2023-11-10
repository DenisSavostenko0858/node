const { error } = require("console");
const express = require("express")
const favicon = require("express-favicon");
const fs = require("fs")
const { appendFile } = require("fs");
const path = require("path");
const app = express();
const ejs = require("ejs");
const port = '3000';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded((extended = true)));
//Доступ к папке на прямую
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'views')));
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

//error hundler
app.use((req, res, next) => {
    const err = new Error("NO FOUND ERROR");
    err.status = 404;
    // console.log(err);
    next(err);
});


//Если мы зашли не под dev то ошибка будет в виде файла err.js, если dev то консоль лог
if (app.get("env") != "development"){
        app.use(function(err, req, res, next){
            res.status = 404;
            let img = "https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png";
            res.render("err.ejs", {err,img}); //Передаем обьект err
        })}
    else{
        app.use(function(err, req, res, next){
        console.log(app.get("env"), err.status, err.message);
        });
    };        

//Прослушиваем порт
app.listen(port, function(){
    console.log("Сервер запущен порт " + port);
    addLine("Server started");
});