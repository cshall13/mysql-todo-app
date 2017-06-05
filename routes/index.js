var express = require('express');
var router = express.Router();

var config = require('../config/config')
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.host,
	user: config.userName,
	password: config.password,
	database: config.database
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// add a post route "addItem" to handle the form submission
router.post('/addItem',(req,res)=>{
	res.json(req.body);
	var newTask = req.body.newTask;
	var dueDate = req.body.newTaskDate;
	// we know what they submitted from the form. it comes to this route 
	// inside req.body.
});

module.exports = router;
