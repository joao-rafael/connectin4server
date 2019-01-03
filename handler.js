console.log("Handler module launched!");
//"use strict";
//node js calls
const { parse } = require("querystring");
const fs = require("fs");

//variables to use for data persistance
var file = "data.json";
var parsedData;
var wrottenData;

//more created modules
const functions = require("./functions");
const fileDatabase = require("./fileDatabase");
const engine = require("./engine");

const header = {
  POST: { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" },
  SSE: {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    Connection: "keep-alive"
  }
};

//exported functions
module.exports = {
  doPOST: (request, response, pathname) => {
    console.log("launched doPost function!");
    let reqData = "";
    error = false;
    request.on("data", chunk => {
      reqData = JSON.parse(chunk);
      console.log("received data: " + reqData);
      try {
        let user = fileDatabase.getUser(reqData);
        if (user.pass !== reqData.pass) {
          console.log(user.pass);
          console.log(reqData.pass);
          error = true;
        }
      } catch (ex) {
        console.log(fileDatabase.getAllUsers().keys());
        console.log(ex);
        error = true;
      }
    });
    request.on("end", () => {
      if (error) {
        response.writeHead(401, header.POST);
        response.write("Usuario invalido");
        response.end();
      } else {
        //readJsonFile(reqData); retirado por motivo de ter maiores prioridades
        switch (pathname) {
          case "/register":
            console.log("Register function will be called\n");
            functions.register(reqData, response);
            break;
          case "/ranking":
            console.log("ranking function will be called\n");
            break;
          case "/join":
            console.log("join function will be called\n");
            break;
          case "/leave":
            console.log("leave function will be called\n");
            break;
          case "/notify":
            break;
          default:
        }
        console.log(reqData);
        response.writeHead(200, header.POST);
        response.write(JSON.stringify(reqData));
        response.end();
      }
    });
  },
  doGET: (request, response) => {
    response.writeHead(200, response.getHeaders());
    response.write(JSON.stringify({ message: "Everything works!" }));
    response.end();
  },
  doOptionsRequest: (request, response) => {
    console.log(
      "Options request made: implemented because of CORS policy. Adding headers\n"
    );
    response.writeHead(200, response.getHeaders());
    response.write(JSON.stringify({ message: "Everything works!" }));
    response.end();
  }
};
//talvez eu venha a usar
function checkFileObj(data) {
  for (var i = 0; i < robj.length; i++) {
    // look for the entry with a matching `code` value
    let inserted = JSON.stringify(data);
    if (robj[i].nick == inserted.nick) {
      console.log(robj[i]);
      // we found it
      if (robj[i].pass == inserted.pass) {
        console.log("login");
        return true;
      }
      // obj[i].name is the matched result
    }
  }
}
