const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const User = require("./models/user.js");
const errorController = require("./controllers/errorController.js");
const mongoConnect = require("./util/database.js").mongoConnect;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6608336bbf9bbdbb62d8ee81")
    .then((user) => {
      req.user = new User(user.name, user.email, user.card, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("/", errorController.getError);

mongoConnect(() => {
  app.listen(3000);
});
