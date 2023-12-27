const Campground = require("../models/campground.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({}).sort({ createdAt: -1 });

  res.render("campgrounds", { campgrounds });
};

module.exports.getNewPage = (req, res) => {
  res.render("new");
};

module.exports.newCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;

  await campground.save();
  req.flash("success", "Yeni kamp oluşturuldu");

  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.getDetailPage = async (req, res, next) => {
  const { id } = req.params;
  const camp = await Campground.findById(id)
    .populate({
      path: "review",
      populate: {
        path: "author",
      },
      options: { sort: { createdAt: -1 } },
    })
    .populate("author");

  if (!camp) {
    req.flash("error", "Aradığınız şeyi bulamadık.");
    return res.redirect("/campgrounds");
  }
  res.render("detail", { camp });
};
module.exports.getEditPage = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  if (!camp) {
    req.flash("error", "Aradığınız şeyi bulamadık.");
    return res.redirect("/campgrounds");
  }

  res.render("edit", { camp });
};
module.exports.editCampGround = async (req, res) => {
  const { id } = req.params;

  const newcamp = req.body.campground;

  await Campground.findByIdAndUpdate(id, { ...newcamp }, { new: true });
  req.flash("success", "Güncelleme işlemi başarılı");
  return res.redirect(`/campgrounds/${id}`);
};
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id, { new: true });
  req.flash("success", "Silme işlemi başarılı");
  res.redirect("/campgrounds");
};
