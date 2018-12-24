# Basic NodeJS manual
#### Study material for the third frequency test of the Web Technologies Curricular unity.

NodeJs é um interpretador JavaScript _OpenSource_. Geralmente, utilizado para o desenvolvimento de servers.

## Node JS modules:
NodeJs é organizado por módulos, os módulos podem ser interpretados como pequenas bibliotecas de código. Os módulos essenciais para implementação de um server HTTP são:
* HTTP(importa métodos para lidar com HTTP)
* URL(obtenção de dados a partir de um URL)
* File System(FS)
* Stream(Interface para lidar com dados abstratos de transmissão)

## Módulo HTTP:
Observe o método require:
```javascript
require("http");
```
Uma vez que, _require(nomeDoModulo)_, retorna uma instância de classe(isto é, um objeto), convém fazer a importação de um módulo da seguinte maneira:
```javascript
const http = require("http");
```
Assim sendo, a constante http será uma instância da classe que _require(http)_ invoca, sendo os métodos acessados da seguinte maneira:
```javascript
http.metodo(argumentos);
```
Logo, pode-se usar os métodos do módulo http, sendo os dois principais, os métodos de inicialização e escuta do server:
```javascript
const port = 8001;
const http = require("http");

const server = http.createServer(function(req, res){
  //algum código de execução do sever
});
server.listen(port);
```
Perceba que:
o método createServer recebe como parâmetro uma função anônima(isto é, sem nome declarado). Esta função tem como parâmetros _request_ e _response_ do pedido. O método _listen_ deixa o server a escuta na porta determinada na passagem de argumentos(neste caso, a constante _port_ que tem como valor atribuído: 8001).
