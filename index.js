// Ejercicio 1: crear servidor HTTP con Node
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const PORT = process.env.PORT ?? 1234;

function processRequest(req, res) {
  const { method, url } = req;
  switch (url) {
    case "/":
      if (method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset:utf8" });
        return res.end("<h1>¡Hola mundo!</h1>");
      } else {
        return err405(req, res);
      }
    case "/404":
      if (method === "GET") {
        return err404(req, res);
      } else {
        return err405(req, res);
      }

    case "/logo.webp":
      if (method === "GET") {
        fs.readFile(path.join("assets", "logo.webp"), (err, data) => {
          if (err) {
            console.log(`Ha ocurrido un error : ${err}`);
            return;
          } else {
            res.writeHead(200, { "Content-Type": "image/webp" });
            return res.end(data);
          }
        });
      } else {
        return err405(req, res);
      }
      break; //porque es necesario un break aqui para que funcione?
    case "/contacto":
      if (method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          const data = JSON.parse(body);
          res.writeHead(201, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(data));
        });
      } else {
        return err405(req, res);
      }
      break; //porque es necesario un break aqui para que funcione?
    default:
      err404(req, res);
  }
}

function err405(req, res) {
  res.writeHead(405, {
    "Content-Type": "text/html; charset=utf8",
  });
  return res.end("<h1>405</h1>");
}

function err404(req, res) {
  res.writeHead(404, {
    "Content-Type": "text/html; charset=utf8",
  });
  return res.end("<h1>404</h1>");
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
