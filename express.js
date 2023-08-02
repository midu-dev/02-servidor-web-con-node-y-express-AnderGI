// Ejercicio 2: crear servidor HTTP con Express
const express = require("express");
const PORT = process.env.PORT ?? 1234;
const fs = require("node:fs");

function startServer() {
  const server = express();

  server.use(express.json());
  server.use(express.static("assets"));
  //si ruta soporta un metodo bien, si no 405
  //Todos son GET si no se dice lo contrario
  server.all("/", (req, res) => {
    if (req.method === "GET") {
      return res.send("<h1>¡Hola mundo!</h1>");
    } else {
      return res.status(405).send("<h1>405</h1>");
    }
  });

  server.all("/404", (req, res) => {
    if (req.method === "GET") {
      return res.status(404).send("<h1>404</h1>");
    } else {
      return res.status(405).send("<h1>405</h1>");
    }
  });

  //POST
  //con el url /contacto bien sino 405 porque no soporta esa ruta la accion POST
  server.all("/contacto", (req, res) => {
    if (req.method === "POST") {
      return res.status(201).json(req.body);
    } else {
    }
    return res.status(405).send("<h1>405</h1>");
  });

  //si no existe 404 ninguna de las url anteriores
  server.use((req, res) => {
    req.status(404).send("<h1>404</h1>");
  });

  return server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

module.exports = {
  startServer,
};
