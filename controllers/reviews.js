const Review = require("../models/review");
const Campground = require("../models/campground");


module.exports.newReview = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate("review");
    const { body, rating } = req.body;
    const review = new Review({ body, rating });
    review.author = req.user._id;
    await review.save();
    campground.review.push(review);
    await campground.save();
    req.flash("success", "Yorumunuz başarı ile eklendi");
    res.redirect(`/campgrounds/${id}`);
  }

  module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Yorumunuz silindi");
    res.redirect(`/campgrounds/${id}`);
  }