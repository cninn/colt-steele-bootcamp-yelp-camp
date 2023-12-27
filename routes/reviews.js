const express = require("express");
const router = express.Router({ mergeParams: true });

const {isLoggedIn, isReviewAuthor} = require('../middleware');
const catchAsync = require("../utils/catchAsync");
const {newReview,deleteReview} = require('../controllers/reviews');

//!POSTA EK VERİ EKLEME ÖRN : YORUM
router.post(
  "/",isLoggedIn,
  catchAsync(newReview)
);

//! BİR GÖNDERİNİN KENDİNE AİT EK GÖNDERİLERİNİ SİLME İŞLEMİ.
router.delete(
  "/:reviewId",isLoggedIn,isReviewAuthor,
  catchAsync(deleteReview)
);

module.exports = router;
