const fs = require("fs");

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url == "/") {
    const homePageContent = `<html>
            <title>Your Form</title>
            <head>
              <body>
                <form action="/message" method="POST">
                  <input type="text" name="message">
                  <button type="submit">Send !</button>
                </form>
              </body>
            </head>
          </html>`;

    res.setHeader("Content-Type", "text/html");

    res.write(homePageContent);
    res.end();
    return; // to not execute the code after ending the response we are returning from here
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302; // without return , page redirect will not work  , so for redirect status code is necessary
        res.setHeader("Location", "/");
        return res.end();
      });
    });
    return;

    // return call to a function ();
    // it simply means that
    // after calling the function return from there
    // >> function call () and after that return
    // abc();
    // return ;
    // return abc();
  }

  res.setHeader("Content-Type", "text/html");

  const body = `<html>
                  <title>
                    Set Body
                  </title>
                  <head>
                    <body>
                      Welcome to My Node JS APP
                    </body>
                  </head>
                </html>
        `;

  res.write(body);
  res.end();

  // you can't write further code after sending the response
  // ex:- res.write('you can not send after ending the response)
}

//method 1
module.exports = requestHandler;

// method 2
// module.exports = {
//   handler: requestHandler,
//   someKey: "some hard coded value",
// };

// method 3
// module.exports.handler = requestHandler;
// module.exports.someKey = "some hard coded key";

//method 4 -- simply ommit the module keyword

// exports.handler = requestHandler;
// exports.someKey = "Some Hard Coded Key";

// export default requestHandler;
