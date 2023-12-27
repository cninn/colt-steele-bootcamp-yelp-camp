const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
      res.locals.returnTo = req.session.returnTo;
  }
  next();
}

module.exports.isLoggedIn = (req, res, next) => {
  
  if (!req.isAuthenticated()) {
      req.session.returnTo = req.originalUrl;
      req.flash('error', 'Lütfen Giriş Yapınız!');
      return res.redirect('/users/login');
  }
  next();
};

module.exports.isAuthor =async(req,res,next)=>{
  const {id} = req.params;
  const campground = await Campground.findById(id);

  if (!campground.author.equals(req.user._id)) {
    console.log(req.user._id);
    req.flash('error', 'Bu işlem için yetkiniz yok');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();

}
module.exports.isReviewAuthor =async(req,res,next)=>{
  const {id,reviewId} = req.params;
  const review = await Review.findById(reviewId);

  if (!review.author.equals(req.user._id)) {
    console.log(req.user._id);
    req.flash('error', 'Bu işlem için yetkiniz yok');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();

}