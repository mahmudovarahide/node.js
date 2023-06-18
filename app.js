const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
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
    return res.write("</html>");
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.text", message);
    });
    fs.writeFileSync("message.text", "sd");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Sample Page</title></head>");
  res.write("<body>");
  res.write("<h1>Hello, World!</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
});

server.listen(4000);
