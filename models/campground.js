const mongoose = require("mongoose");
const Review = require("./review");

const campgroundSchema = new mongoose.Schema(
  {
    title:String,
    price:Number,
    description: String,
    location: String,
    url: String,
    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    review:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
      }
    ]
  },
  { timestamps: true }
);

//!BİR GÖNDERİYİ SİLERKEN ONUN EK VERİLERİNİ DE SİLME İŞLEMİ
campgroundSchema.post('findOneAndDelete',async function(doc){
  if(doc){
    await Review.deleteMany({
      _id:{
        $in:doc.review
      }
    })
  }
})

const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
