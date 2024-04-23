const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  const users = [];
  // every time when the new request hits , this users list will be new and empty
  // so you can not iterate over the users array in /users route

  if (url === "/" && method === "GET") {
    const homePageContent = `
              <html>
              <title>Submit User</title>
              <body>
                  <form method="POST" action ="/create-user">
                  <label>UserName</label>
                      <input type="text" name="username">
                      <button type="submit">Submit</button>
                  </form>
              </body>
              </html>
          `;

    res.setHeader("Content-Type", "text/html");
    res.write(homePageContent);
    return res.end();
  }

  if (url === "/users" && method === "GET") {
    let userDynamicList = "";

    users.forEach((element) => {
      userDynamicList += "<li>" + element + "</li>";
    });
    console.log(userDynamicList);
    console.log(users);

    const userList = `
              <html>
              <body>
              <ul>
                  ${userDynamicList}
              </ul>
              </html>
          `;

    res.setHeader("Content-Type", "text/html");
    res.write(userList);
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    let username = "";
    const postData = [];

    req.on("data", (chunk) => {
      postData.push(chunk);
    });

    return req.on("close", () => {
      username = Buffer.concat(postData).toString();
      users.push(username.split("=")[1]);

      console.log(username.split("=")[1]);

      console.log(users);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};

module.exports = requestHandler;
