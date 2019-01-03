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

//other functions - as shows in the slides:
function getMediaType(pathname) {
  const pos = pathname.lastIndexOf(".");
  let mediaType;
  if (pos !== -1) mediaType = conf.mediaTypes[pathname.substring(pos + 1)];
  if (mediaType === undefined) mediaType = "text/plain";
  return mediaType;
}
function isText(mediaType) {
  if (mediaType.startsWith("image")) return false;
  else return true;
}

//doGetPathname
function doGetPathname(pathname, response) {
  const mediaType = getMediaType(pathname);
  const encoding = isText(mediaType) ? "utf8" : null;
  fs.readFile(pathname, encoding, (err, data) => {
    if (err) {
      response.writeHead(404); // Not Found
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": mediaType });
      response.end(data);
    }
  });
}
module.exports = {
  doGetPathname1: (pathname, response) => {
    console.log("Imported from Index");
    const mediaType = getMediaType(pathname);
    const encoding = isText(mediaType) ? "utf8" : null;
    fs.readFile(pathname, encoding, (err, data) => {
      if (err) {
        response.writeHead(404); // Not Found
        response.end();
      } else {
        response.writeHead(200, { "Content-Type": mediaType });
        response.end(data);
      }
    });
  }
};
