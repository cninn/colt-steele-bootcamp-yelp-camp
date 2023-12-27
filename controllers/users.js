const User = require("../models/user");
module.exports.registerPage = (req, res) => {
  if (req.user) {
    res.redirect("/");
  }
  res.render("reg");
};
module.exports.newUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const regUser = await User.register(user, password);

    req.login(regUser, (err) => {
      if (err) return next(err);
    });
    req.flash("success", "Kayıt işlemi başarılı");
    res.redirect("/users/login");
  } catch (e) {
    req.flash("error", "Lütfen bilgileri eksiksiz doldurunuz");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl);
  }
};

module.exports.getLoginPage = (req, res) => {
  if (req.user) {
    res.redirect("/");
  }
  res.render("log");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Hoşgeldiniz");
  res.redirect("/campgrounds");
};
module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
