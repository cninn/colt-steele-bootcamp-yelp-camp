const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const {
  registerPage,
  newUser,
  getLoginPage,
  login,
  logout,
} = require("../controllers/users");

router.route("/register").get(registerPage).post(catchAsync(newUser));

router
  .route("/login")
  .get(getLoginPage)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/users/login",
    }),
    catchAsync(login)
  );

router.get("/logout", logout);
module.exports = router;
