var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    database : 'nodePractice',
    debug    :  false
});

app.use(bodyParser.json());
// Specify src as the space where public files are found
app.use('/', express.static(__dirname + '/src'));
// Add in the line below to bring in your dist folder too
app.use('/dist', express.static(__dirname + '/dist'));

var task = {};

function controlDatabase(req,res,quereazy) {

  console.log('trying');
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query(quereazy,function(err,rows){
            connection.release();
            if(!err) {
            		console.log(rows);
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
};

app.get('/api/tasks', function(req,res){
    controlDatabase(req,res,"select * from tasks");
});

app.post('/api/tasks',function(req,res){
    controlDatabase(req,res,"INSERT INTO tasks (title) VALUES ('" + req.body.title + "')");
});

app.listen(7000);