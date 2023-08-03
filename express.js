// Ejercicio 2: crear servidor HTTP con Express
const express = require("express");
const PORT = process.env.PORT ?? 1234;
const fs = require("node:fs");

function startServer() {
  const server = express();
  server.disable("x-powered-by");
  //Solo metodos post y application/json el json queda dentro del req.body
  server.use(express.json());

  //Publica al cliente los recursos dentro de assets (si hubiese más, publicaria todos?)
  server.use(express.static("assets"));

  //MIRO POR RUTAS Y DENTRO DE CADA UNA POR LOS METODOS QUE SOPORTA
  //SI RUTA NO SOPORTA METODO -> 405
  //SI RUTA NO EXISTE 404
  server.all("/", (req, res) => {
    if (req.method === "GET") {
      return res.send("<h1>¡Hola mundo!</h1>"); //por defecto status 200 y Content-Type : text/html con el charset utf8
    } else {
      //ruta solo soportaba el metodo GET los demas 405
      return res.status(405).send("<h1>405</h1>");
    }
  });

  server.all("/404", (req, res) => {
    if (req.method === "GET") {
      return res.status(404).send("<h1>404</h1>");
    } else {
      //ruta solo soportaba el metodo GET los demas 405
      return res.status(405).send("<h1>405</h1>");
    }
  });

  //Manejar posibles acciones http en la ruta /logo.webp que no sean GET
  server.all("/logo.webp", (req, res) => {
    if (req.method !== "GET") {
      return res.status(405).send("<h1>405</h1>");
    }
  });

  //POST
  //con el url /contacto bien sino 405 porque no soporta esa ruta la accion POST
  server.all("/contacto", (req, res) => {
    if (req.method === "POST") {
      //el middleware express.json() añade al req.body el json en metodos post de content-type application/json
      return res.status(201).json(req.body);
    } else {
      //ruta solo soportaba el metodo POST los demas 405
      return res.status(405).send("<h1>405</h1>");
    }
  });

  //si no existe 404 ninguna de las url anteriores
  server.use((req, res) => {
    return res.status(404).send("<h1>404</h1>");
  });

  return server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer();
/*
module.exports = {
  startServer,
};
*/
