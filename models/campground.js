const mongoose = require("mongoose");
const Review = require("./review");



const imageSchema = new mongoose.Schema({
  url:String,
  filename:String,
})
imageSchema.virtual('thumbnail').get(function(){
  return this.url.replace('/uploads','uploads/w-200')
})
const campgroundSchema = new mongoose.Schema(
  {
    title:String,
    price:Number,
    description: String,
    location: String,
   
    image:[imageSchema],
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

https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/r_max/f_auto/woman-blackdress-stairs.png

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
