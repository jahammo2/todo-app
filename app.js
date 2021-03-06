var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

dotenv.load();

var pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    debug    :  false
});

app.use(bodyParser.json());
// Specify src as the space where public files are found
app.use('/', express.static(__dirname + '/src'));
// Add in the line below to bring in your dist folder too
app.use('/dist', express.static(__dirname + '/dist'));

var task = {};

function controlDatabase(req,res,query,placeholders) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          console.log(err);
          connection && connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);

        connection.query(query,placeholders,function(err,rows){
            connection.release();
            if(!err) {
            		console.log(rows);
                res.json(rows);
            }           
        });

  });
};

app.get('/api/tasks', function(req,res){
    controlDatabase(req,res,"SELECT * FROM tasks ORDER BY task_id DESC");
});

app.get('/api/tasks/:id', function(req,res){
    controlDatabase(req,res,"SELECT * FROM tasks WHERE task_id= ?",[req.params.id]);
});

app.post('/api/tasks',function(req,res){
  controlDatabase(req,res,"INSERT INTO tasks (title, status) VALUES (?, 0)",[req.body.title]);
});

app.post('/api/tasks/:id/:status',function(req,res){
    controlDatabase(req,res,"UPDATE tasks SET status= ? WHERE task_id= ?",[req.params.status, req.params.id]);
});

app.delete('/api/tasks/:id',function(req,res){
    controlDatabase(req,res,"DELETE FROM tasks WHERE task_id= ?",[req.params.id]);
});

var server = app.listen(process.env.PORT || 7000, function () {
  var host = server.address().address,
      port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});













