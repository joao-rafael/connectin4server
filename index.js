//"use strict";
//module calls - Node.js
const http = require("http");
const url = require("url");
//module calls - my modules
const handler = require("./handler");
const settings = require("./settings");
//listening port constant - imported from settings module
const port = settings.port;
//start of the server
function startServer(port){
  console.log("Server started\nListening on port: " + port);
  server.listen(port);
}
//método que inicia o server
const server = http.createServer((request, response) =>{
    const parsedUrl = url.parse(request.url, true);
    let answer = {};
    //passa o url para análise na constante parsed URL
    switch (request.method) {
        case "POST":
          handler.doRegister(request, response);
          break;
        case "GET":
          handler.doGetRequest(request,response);
          break;
        case "OPTIONS":
          handler.doOptionsRequest(request, response);
          break;
      default:
        response.writeHead({"Access-Control-Allow-Origin" : "*"});
        response.writeHead(500, {"Content-Type" : "text/plain"});
        response.write("Not implemented");
        response.end;
    }
    //request.url devolve a url após a barra
    response.write("Request URL: " + request.url + "\n");
    response.end("end of the response\n");
});
startServer(port);
