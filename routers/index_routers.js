const express = require('express');
const app = express()
const router = express.Router();
const register = require('../controlers/register')

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname + "/public/index.html"))
});
router.post('/', function(req,res){});

router.get('/register',register.form);
router.post('/register', register.submit);

module.exports = router;