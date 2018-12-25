//chamada de módulos - node
const http = require("http");
const url = require("url");
//chamada de módulos autorais
const test = require("./first_module");
//define uma constante port - numero do grupo
const port = 8144;

//função de início, criada por mim
function startServer(port){
  console.log("Server started\nListening on port: " + port);
  server.listen(port);
}

//método que inicia o server
const server = http.createServer(function(request, response){
    const parsedUrl = url.parse(request.url, true);
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Method: " + request.method + " \n");
    string = test.Test();
    response.write("Testing module import: " + string);
    //request.url devolve a url após a barra
    response.write("URL: " + request.url + "\n");
    response.end("hello world!\n");
});

startServer(port);
