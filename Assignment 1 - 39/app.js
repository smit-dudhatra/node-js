const http = require("http");
const rqHandler = require("./requestHandler");

const server = http.createServer(rqHandler);

server.listen(3000);
