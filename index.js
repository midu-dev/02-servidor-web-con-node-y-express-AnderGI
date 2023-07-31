// Ejercicio 1: crear servidor HTTP con Node
const http = require("node:http");
const fs = require("node:fs");
const PORT = process.env.PORT ?? 1234;

function processRequest(req, res) {
  const { method, url } = req;
  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
          res.end("<h1>¡Hola mundo!</h1>");
          break;

        /**Al entrar a la ruta /logo.webp devuelve la imagen que hay en el directorio assets/logo.webp. */
        case "/logo.webp":
          fs.readFile("./assets/logo.webp", (error, data) => {
            if (error) {
              console.log("Ha ocurrido un error");
            }

            res.writeHead(200, { "Content-Type": "image/webp" });
            res.end(data); //se le pasa el buffer
          });
          break;

        case "/404":
          res.writeHead(404, { "Content-Type": "text/html; charset=utf8" });
          res.end("<h1>404</h1>");
          break;

        default:
          res.statusCode = 404;
          res.end("<h1>404</h1>");
          break;
      }
      break;

    case "POST":
      switch (url) {
        case "/contacto":
          {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });
            req.on("end", () => {
              const data = JSON.parse(body);
              res.writeHead(201, {
                "Content-Type": "application/json; charset=utf8",
              });
              res.end(JSON.stringify(data));
            });
          }
          break;
        default:
          res.writeHead(405, { "Content-Type": "text/html; charset=utf8" });
          res.end("<h1>405</h1>");
          break;
      }
      break;

    default:
      res.statusCode = 405;
      res.end("<h1>405</h1>");
      break;
  }
}

function startServer() {
  const server = http.createServer(processRequest);
  return server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

module.exports = {
  startServer,
};
