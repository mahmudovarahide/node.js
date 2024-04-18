exports.getError = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getError500 = (req, res, next) => {
  res.status(500).render("500", {
    pageTitle: "Error!",
    isAuthenticated: req.session.isLoggedIn,
  });
};
