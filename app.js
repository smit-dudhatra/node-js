const http = require("http");

const exportedRoutes = require("./routes");
//if the path has "/" or "./" ,
// node will look for locally to the file path

// three type of function you can use as callback function
// 1 regular named function
// 2 anynonemous function
// 3 arrow function

const server = http.createServer(exportedRoutes);

server.listen(3000);
