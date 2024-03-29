const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database.js");
const Product = require("./models/products.js");
const User = require("./models/user.js");
const Card = require("./models/card.js");
const CardItem = require("./models/card-item.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/errorController.js");
const Order = require("./models/order/order.js");
const OrderItem = require("./models/order/order-item.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.defaultUser = {
    name: "Default User",
    email: "default@example.com",
  };
  next();
});

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      if (user) {
        req.user = user;
        return user.createCard();
      }
      next(new Error("User not found"));
    })
    .then(() => {
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

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Card);
Card.belongsTo(User);
Card.belongsToMany(Product, { through: CardItem });
Product.belongsToMany(Card, { through: CardItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

const createDefaultUser = async () => {
  try {
    const [defaultUser, created] = await User.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "Default User",
        email: "default@example.com",
      },
    });
    console.log("Default user created:", defaultUser.get({ plain: true }));
    return defaultUser;
  } catch (error) {
    console.error("Error creating default user:", error);
    throw error;
  }
};

sequelize
  .sync()
  .then(() => {
    return createDefaultUser();
  })
  .then((user) => {
    app.use((req, res, next) => {
      req.user = user;
      next();
    });
    return user.createCard();
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
