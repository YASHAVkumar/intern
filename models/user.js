const mongoose= require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
require('mongoose-type-email');

const userSchema=new mongoose.Schema({
  are_u_tutor:{
   type:Boolean,
   required:true,
   default:false
  },
  email:{
      type: mongoose.SchemaTypes.Email,
      required: true
  },
})

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema);