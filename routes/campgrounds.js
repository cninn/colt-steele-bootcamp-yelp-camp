const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const myvalidator = require("../utils/valid.js");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor } = require("../middleware.js");

const {
  index,
  getNewPage,
  newCampground,
  getDetailPage,
  getEditPage,
  editCampGround,
  deleteCampground,
} = require("../controllers/campgrounds.js");

router
  .route("/")
  .get(catchAsync(index))
  .post(isLoggedIn, myvalidator, catchAsync(newCampground));

router.get("/new", isLoggedIn, getNewPage);

router
  .route("/:id")
  .get(catchAsync(getDetailPage))
  .put(isLoggedIn, isAuthor, myvalidator, catchAsync(editCampGround))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(getEditPage));

module.exports = router;
