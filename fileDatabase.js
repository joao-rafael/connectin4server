const fs = require("fs");
const path = require("path");
let map = new Map();
let filePath = "./data.json";

const getAllUsers = () => {
  //ler do arquivo
  try {
    let data = fs.readFileSync(path.resolve(__dirname, filePath), "utf8");
    map = new Map(JSON.parse(data));
    return map;
  } catch (error) {
    console.log(error);
    throw new Error("Falha na leitura do arquivo " + filePath);
  }
};

const addUser = user => {
  //sobrescrita do arquivo
  if (map.has(user.login)) {
    throw new Error(
      "Usuário não pôde ser criado. Já existe usuário " +
        user.login +
        " cadastrado no sistema"
    );
  }

  try {
    map.set(user.login, user.pass);
    fs.writeFileSync(filePath, JSON.stringify([...map]));
  } catch (error) {
    console.log(error);
    throw new Error("Falha na leitura do arquivo " + filePath);
  }
};

const deleteUser = user => {
  //delete no arquivo
  if (!map.delete(user.login)) {
    throw new Error(
      "Usuário não pôde ser deletado. Não existe usuário " +
        user.login +
        "cadastrado no sistema"
    );
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(map));
  } catch (error) {
    throw new Error("Falha na leitura do arquivo " + filePath);
  }
};

const getUser = user => {
  //pegar o usuario
  if (!map.has(user.user)) {
    throw new Error("Usuário " + user.user + " não cadastrado no sistema");
  } else {
    let password = map.get(user.user);
    return { user: user.user, pass: password };
  }
};
map = getAllUsers();
module.exports = { getAllUsers, getUser, deleteUser, addUser };
