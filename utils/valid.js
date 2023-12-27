const joi = require('joi');
const ExpressError = require('./ExpressError');
const myvalidator =(req,res,next)=>{
    const campgroundSchema = joi.object({
        campground:joi.object({
          title:joi.string().required(),
          price:joi.number().required().min(0),
          description:joi.string().required(),
          location:joi.string().required(),
          url:joi.string().required()
        }).required()
      });
      const {error} = campgroundSchema.validate(req.body);
     
      if(error){
        const msg = error.details.map(el=>el.message).join(',');
        
        throw new ExpressError(msg,400);
    
      }else{
        next();
      }
}
module.exports = myvalidator;