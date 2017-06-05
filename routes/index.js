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


connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
	var message = req.query.msg;
	if(message == "added"){
		message = 'Your task was added!';
	}
	var selectQuery = "SELECT * FROM tasks";
	connection.query(selectQuery, (error,results)=>{
  		res.render('index', { 
  			message: message,
  			taskArray: results
  		});
	});
});

// add a post route "addItem" to handle the form submission
router.post('/addItem',(req,res)=>{
	// res.json(req.body);
	var newTask = req.body.newTask;
	var dueDate = req.body.newTaskDate;
	// we know what they submitted from the form. it comes to this route 
	// inside req.body.NAMEOFFIELD. Now we need to insert it into MySql.
	var insertQuery = "INSERT INTO tasks (taskName, taskDate) VALUES ('"+newTask+"','"+dueDate+"')";
	// res.send(insertQuery);
	connection.query(insertQuery, (error,results)=>{
		if(error) {throw error};
		res.redirect('/?msg=added');
	});
});

router.get('/delete/:id', (req,res)=>{
	var idToDelete = req.params.id;
	var deleteQuery = "DELETE from stasks WHERE id = " + idToDelete;
	connection.query(deleteQuery,(error,results)=>{
		res.redirect('/?msg=deleted')
	});
	// res.send(idToDelete);
});

module.exports = router;
