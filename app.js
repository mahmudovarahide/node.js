const path = require("path");

const express = require("express");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const rooDir = require("./util/path");

const adminData = require("./routes/admin.js");

const shopRoutes = require("./routes/shop.js");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.locals.basedir = path.join(__dirname, "views");

app.use("/", (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
  // res.status(404).sendFile(path.join(rooDir, "views", "404.html"));
});

app.listen(3000);
