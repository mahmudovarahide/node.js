const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write("<body>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/html");
          res.write("<html>");
          res.write("<head><title>Error</title></head>");
          res.write("<body><h1>Internal Server Error</h1></body>");
          res.write("</html>");
          return res.end();
        }

        res.statusCode = 302;
        res.setHeader("Location", "/create-user");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Sample Page</title></head>");
  res.write("<body>");
  res.write("<h1>Hello, World!</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: 'Salam',
};

//HER IKI VARIANT VAR EXPORT ETMEK UCUN

// exports.handler = requestHandler;
// exports.someText = "Text";
