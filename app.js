import express from "express";
const app = express();
const port = '3000';

app.get('/', function (req, res){
    res.end('Hello world');
    console.log(req) //Вывод к нам в консоль не в браузер
})

app.listen(port,() => {console.log('listening on port: ' + port);});