console.log("STARTING APP");

var response = function (request, response) {
  console.log("HANDLING REQUEST");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("OK");
}

require('http').createServer(response).listen(8000);
