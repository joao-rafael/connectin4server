/*This file contains the functions*/
console.log("Functions module launched!");
var data = "data.json";
module.exports = {
  register: (reqData,response) => {
    console.log("todo");
    //response.writeHead(200);
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
