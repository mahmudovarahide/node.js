const path = require("path");

const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRouters = require("./routes/admin.js");

const shopRoutes = require("./routes/shop.js");

const errorPageController = require("./controllers/errorController.js");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouters);

app.use(shopRoutes);

app.locals.basedir = path.join(__dirname, "views");

app.use("/", errorPageController.getError);

app.listen(3000);
