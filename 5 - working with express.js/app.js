// server creation with the http module and express module

const http = require("http");

const express = require("express");

//core modules and third party modules , both will don't have the "/" in the
// require statement

const app = express();

app.use((req, res, next) => {
  console.log("in the middleware");
  next(); // it redirectes the request to the next middleware in line
});

app.use((req, res, next) => {
  console.log("in another middleware");
  res.send("<h1>Hello from Express JS</h1>");

  // in middleware function
  // either you have to send a response or call a next method on it

  //either call next or end method

  // you can call the native request and response method on express middleware also
  // like res.write , res.setHeader etc ....
});

const server = http.createServer(app); // express app instance is used as requestlistener to createserver method of http module

server.listen(3000);
