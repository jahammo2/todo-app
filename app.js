// how we require modules
var http = require('http')
// how we include libraries in node

// we then create a server that takes a callback
http.createServer(function (request,response) {
// the request is the first argument in the createServer function
// both request and response are callbacks
  // means you're writing a 200 status code in the header
  response.writeHead(200);
  // means you're writing hello this is dog in the body
  response.write('hello this is dog');
  // end the response
  response.end();
// listen for connections on port 8080
}).listen(8080);

// to ensure our server is running, console.log this
console.log('listening on port 8080');