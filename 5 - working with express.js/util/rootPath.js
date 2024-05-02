const path = require("path");
// console.log(require.main.filename); // absolute path to the main file
module.exports = path.dirname(require.main.filename);

//this will give you the path to the folder
// which spins up the app
// in this case it is
// absolute path to the expressServer.js
