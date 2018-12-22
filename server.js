//chamada de módulos
const http = require("http");
const url = require("url");

//define uma constante port
const port = 1919;

//função de início, criada por mim
function startServer(port){
  console.log("Server started\nListening on port: " + port);
  server.listen(port);
}

//método que inicia o server
const server = http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Method: " + request.method + " \n");
    response.write("URL: " + request.url + "\n");
    response.end("hello world!\n");
});

startServer(port);
