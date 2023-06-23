const http = require("http");

const routes = require('./routes.jsx');

const server = http.createServer(routes.handler);

server.listen(3000);