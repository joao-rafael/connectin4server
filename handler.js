console.log("Handler module launched!");
//"use strict";
//node js calls
const {parse} = require('querystring');
const fs = require("fs");

//variables to use for data persistance
var file = "data.json";
var parsedData;
var wrottenData;

//more created modules
const functions = require("./functions");
const engine = require("./engine");

//test: nick: amelie pass:poulain

//Response headers
// const POSTheader = {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'};
// const GETheader = {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache',
//                   'Access-Control-Allow-Origin': '*', 'Connection': 'keep-alive'};
const header =  {'POST': {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'},
                 'SSE':  {'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*', 'Connection': 'keep-alive'}
                };
//
// function readJsonFile(){
//   //fs.readfile(file, options, callbackFunciton(err, data))
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) throw err;
//     parsedData = JSON.parse(data);
//     console.log(parsedData);
//     //return parsedData;
//   });
// }

function writeJsonFile(file, data){
  //function called when needs to update the data
  fs.writeFile(file, JSON.stringify(data), (err) =>{
    if(err){
      console.log("Data writting error: " + err);
    }
    console.log("data set.");
    wrottenData = JSON.stringify(data);
    /**
    WrottenData is a Global Variable, so I think
    that there is no need to return statement.
    */
  });
}
// function saveInJsonFile(data){
//   fs.writeFile(file, JSON.stringify(data), err =>{
//     if(err) throw err;
//     console.log("file updated.");
//   });
// }

//exported functions
module.exports = {
    doPOST: (request,response,pathname) => {
      console.log("launched doPost function!");
      let reqData = "";
      request.on("data",(chunk) => {
        reqData += chunk;
        console.log("received data: " + reqData);
        // if(!checkFileObj(dados)){
        //   console.log("user not registered, saving");
        //   saveInJsonFile(dados);
        // }else{
        //   console.log("user registered, loging in");
        // }
      });
      request.on('end', () => {
        //readJsonFile(reqData); retirado por motivo de ter maiores prioridades
        switch(pathname){
          case "/register":
            console.log("Register function will be called\n");
            functions.register(reqData,response);
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
        console.log(JSON.parse(reqData));
        response.writeHead(200, header.POST);
        response.write('{}');
        response.end();
        console.log("resposta enviada");
      });
    },
    doGET: (request,response) => {
      request.on("end", () => {
          response.writeHead(200, GETheader);
          response.write("get response\n");
          response.end("success");
        });
    },
    doOptionsRequest: (request,response) => {
      console.log('Options request made: implemented because of CORS policy. Adding headers\n');
      let optionsHeaders = {};
      // IE8 does not allow domains to be specified, just the *
      // optionsHeaders["Access-Control-Allow-Origin"] = req.optionsHeaders.origin;
      optionsHeaders["Access-Control-Allow-Origin"] = "*";
      optionsHeaders["Access-Control-Allow-Methods"] = "POST, GET, PUT, OPTIONS";
      optionsHeaders["Access-Control-Allow-Credentials"] = false;
      optionsHeaders["Access-Control-Max-Age"] = '86400'; // 24 hours
      //optionsHeaders["Access-Control-Allow-optionsHeaders"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      response.writeHead(200, optionsHeaders);
      response.end("Success");
    }
}
//talvez eu venha a usar
function checkFileObj(data){
  for (var i = 0; i < robj.length; i++){
    // look for the entry with a matching `code` value
    let inserted = JSON.stringify(data);
    if (robj[i].nick == inserted.nick){
      console.log(robj[i]);
       // we found it
       if(robj[i].pass == inserted.pass){
         console.log("login");
         return true;
       }
      // obj[i].name is the matched result
    }
  }
}
