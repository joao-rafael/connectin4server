//"use strict";  have to see what this stands for

//module calls - Node.js
const http = require("http");
const url = require("url");

//module calls - my modules
const handler = require("./handler");
const settings = require("./settings");

//listening port constant - imported from settings module
const port = settings.port;

//instanciates and put the server on listening
function startServer(port) {
  console.log("All modules set.\nServer started\nListening on port: " + port);
  server.listen(port);
}

//Creates the server
const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  let pathname = parsedUrl.pathname;
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Request-Method", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS"
  );
  response.setHeader("Access-Control-Allow-Headers", "*");
  response.setHeader("Access-Control-Max-Age", "86400");

  let query;
  //passa o url para análise na constante parsed URL
  console.log(request.method);
  switch (request.method) {
    case "POST":
      handler.doPOST(request, response, pathname);
      break;
    case "GET":
      handler.doGET(request, response);
      break;
    case "OPTIONS":
      handler.doOptionsRequest(request, response);
      break;
    default:
      response.writeHead({ "Access-Control-Allow-Origin": "*" });
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write("Request URL: " + request.url + "\n");
      response.write("Not implemented");
      response.end("end of the response\n");
  }
  //request.url devolve a url após a barra
});

//call of the startServer function
startServer(port);
