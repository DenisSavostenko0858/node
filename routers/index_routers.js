const express = require('express');
const app = express()
const router = express.Router();

router.get('/', function(req,res){});
router.post('/', function(req,res){});

router.get('/register', function(req,res){});
router.post('/register', function(req,res){});

module.exports = router;