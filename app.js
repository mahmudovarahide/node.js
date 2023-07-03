const path = require("path");

const express = require("express");

const rooDir = require("./util/path");

const adminData = require("./routes/admin.js");

const shopRoutes = require("./routes/shop.js");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(rooDir, "views", "404.html"));
});

app.listen(3000);
