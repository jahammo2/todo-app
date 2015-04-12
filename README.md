### How I'm going through making this todo app using JavaScript, Node, and MySQL

##### initially in command line
- npm install --save express
- npm install --save mysql
- npm install --save body-parser

##### hook up the database with this code

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

function get_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from tasks",function(err,rows){
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
}

app.get("/",function(req,res){-
        get_database(req,res);
});

app.listen(8080);

##### bringing scss and js concat into project
- npm install --save-dev node-sass
- then go to package.json and bring in this array:
  "scripts": {
    "scss": "node-sass src/css/main.scss dist/main.css"
  },
- then type into command line: npm run scss
- go into app.js and add in app.use('/dist', express.static(__dirname + '/dist'));
- type into command line: find src/** -type f -name '*.js' ! -name 'app.js' ! -name 'init.js' -print0 | sort -z | xargs -0 cat -- >>dist/app.js
- type into package.json in the scripts part:
"js": "cp src/app.js dist/app.js && find src/** -type f -name '*.js' ! -name 'app.js' ! -name 'init.js' -print0 | sort -z | xargs -0 cat -- >>dist/app.js && cat src/init.js >> dist/app.js"
&& cat src/init.js this for when we use jQuery
- type npm install --save-dev onchange
- add to "scripts" :"watch:scss": "onchange 'src/**/*.scss' -- npm run scss"
- rerun npm run scss
- type into cmmand line: npm run watch:scss & node app.js
- then add to scripts: "watch:js": "onchange 'src/**/*.js' -- npm run js",
- type into cmmand line: npm run watch:scss & npm run watch:js & node app.js
- add this to scripts: "watch": "npm run scss && npm run js && npm run watch:scss & npm run watch:js & node app.js". 
This will allow us to just type in npm run watch.


































 