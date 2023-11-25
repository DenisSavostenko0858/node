const express = require('express');
const app = express()
const router = express.Router();

router.get('/', function(req,res){});
router.post('/', function(req,res){});

router.get('/register', function(req,res){
    res.render("register.ejs");
});
router.post('/register', function(req,res){
    console.log("Register");
    res.end("Register");
});

module.exports = router;