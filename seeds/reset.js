const mongoose = require("mongoose");
const Campground = require("../models/campground");
const Review = require('../models/review');
const cities = require("./cities");
const { descriptors, places } = require("../utils/seedHelpers");

const reset = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("Database is active!");
  } catch (error) {
    console.error("Connection error:", error);
  }

  const sample = (array) => array[Math.floor(Math.random() * array.length)];

  const seedDb = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});

    for (let i = 0; i < 50; i++) {
      const random1000 = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
        author:'6589b275795d48187d1182b1',
        location: `${cities[random1000].city},${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        url: "https://source.unsplash.com/collection/483251",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, officia.",
        price: price,
      });
      await camp
        .save()
        .catch((err) => console.log(err));
    }
  };
  seedDb().then(console.log('VERİLER BAŞARI İLE RESETLENDİ'));
};
module.exports = reset;
