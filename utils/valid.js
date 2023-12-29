const Basejoi = require('joi');
const sanitizeHtml = require('sanitize-html')
const ExpressError = require('./ExpressError');

const extension = (joi)=>({
  type:'string',
  base:joi.string(),
  messages:{
    'string.escapeHTML':'{{#label}} must not include HTML'
  },
  rules:{
    escapeHTML:{
      validate(value,helpers){
        const clean = sanitizeHtml(value,{
          allowedTags:[],
          allowedAttributes:{}
        });
        if(clean !== value) return helpers.error('string.escapeHTML',{value})
        return false;
      }
    }
  }

});

const joi = Basejoi.extend(extension)

const myvalidator =(req,res,next)=>{
    const campgroundSchema = joi.object({
        campground:joi.object({
          title:joi.string().required().escapeHTML(),
          price:joi.number().required().min(0),
          description:joi.string().required().escapeHTML(),
          location:joi.string().required().escapeHTML(),
         
        }).required(),
        deleteImages:joi.array()
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