//module calls - Node.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
//module calls - my modules
const test = require("./first_module");
const settings = require("./settings")
//listening port constant - imported from settings module
const port = settings.port;

//Functions:
//getPathname
function doGetPathname(pathname,response){
    const mediaType = getMediaType(pathname);
    const encoding = isText(mediaType) ? "utf8" : null;
    //functional condition - need to research about
    fs.readFile(pathname,encoding,(err,data) => {
    if(err) {
        response.writeHead(404); // Not Found
        response.write("not found");
        response.end();
    } else {
        response.writeHead(200, { 'Content-Type': mediaType });
        response.end(data);
    }
  });
}

//GET
function doGetRequest(request, response){
  const pathname = getPathname(request);8
  if(pathname == null){
    response.writeHead(403);
    response.write("Forbidden");
    response.end;
  }else{
    //(paramter, function callback(err,stats))
    fs.start(pathname,(err,stats)=>{
      if(err){
        response.writeHead(500);
        response.write("Internal Server Error");
      }else if(stats.isDirectory()){
        if(pathname.endsWith("/")){
          doGetPathname(pathname+conf.defaultIndex,response);
        }else{
          response.writeHead(301, {"Location":pathname+"/"});
          response.end();
        }
      }else{
        doGetPathname(pathname,response);
      }
    });
  }
}
//media types:
function getMediaType(pathname) {
    const pos = pathname.lastIndexOf('.');
    let mediaType;

    if(pos !== -1)
       mediaType = conf.mediaTypes[pathname.substring(pos+1)];

    if(mediaType === undefined)
       mediaType = 'text/plain';
    return mediaType;
}
function isText(mediaType) {
    if(mediaType.startsWith('image'))
      return false;
    else
      return true;
}
//start of the server
function startServer(port){
  console.log("Server started\nListening on port: " + port);
  server.listen(port);
}

//método que inicia o server
const server = http.createServer((request, response) =>{
    const parsedUrl = url.parse(request.url, true);
    //passa o url para análise na constante parsed URL
    switch (request.method) {
      case expression:
        case "POST":
          doPostRequest(request, response);
          break;
        case "GET":
          doGetRequest(request,response);
          break;
      default:
        response.writeHead(500, {"Content-Type" : "text/plain"});
        response.write("Not implemented");
        response.end;
    }
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Method: " + request.method + " \n");
    string = test.Test();
    response.write("Testing module import: " + string);
    //request.url devolve a url após a barra
    response.write("URL: " + request.url + "\n");
    response.end("hello world!\n");
});

startServer(port);
