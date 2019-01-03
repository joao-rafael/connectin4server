/*This file contains the functions*/
console.log("Functions module launched!");

const fs = require("fs");
var file = "data.json";

function readRequest(reqData){
  //just this because i need to know what it is reading
  fs.readFile(file, (err, reqData) => {
      reqData = JSON.parse(reqData.toString());
    });
}
module.exports = {
  register: (reqData, response) => {
    console.log("todo");
    readRequest(reqData);
    console.log(reqData);
    response.writeHead(200);
    //funções já disponíveis mas retiradas por ter que implementar fetch corretamente
  },
  notify: (nick, pass, game, column) => {
    console.log("todo");
  },
  join: (group, nick, pass, size) => {
    console.log("todo");
  },
  leave: (nick, pass, game) => {
    console.log("todo");
  },
  ranking: (size) => {
    console.log("todo");
  }

}
