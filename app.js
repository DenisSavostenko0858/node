const path = require('path');
const fs = require('fs');

// fs.mkdir(path.join(__dirname, 'tmp'),function (err){
// if(err) {console.error(err)}
// console.log("Папка создана")})


const filepath = path.join(__dirname, 'tmp', "2.txt");
console.log(filepath)
// fs.writeFile(filepath, "Something wrong in your file",function (err){
//     if(err) {console.error(err)}
//     console.log("Папка создана")});
    
    fs.appendFile(filepath, "\nSomething wrong in your file",function (err){
        if(err) {console.error(err)}
        console.log("Папка создана")});
        
    fs.readFile(filepath, "UTF-8",(err, data) => {
        if(err) {console.error(err)}
        console.log(data)});