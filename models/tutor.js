const mongoose= require('mongoose');
//const Course=require('./course');
const Student=require('./student')
const passportLocalMongoose=require('passport-local-mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const TutorSchema=new Schema({
  username:{
    type:String,
    required:true
   },
  email:{
         type: mongoose.SchemaTypes.Email,
         required: true
  },
  name:{
   type:String,
   required:true
  },
  phone_no:{
    type:Number,
    minlength:10,
    maxlength:10
  },
   city:{
    type:String
   },
   highest_degree:{
    type:String,
    required:true
   },
   passed_out_year:{
    type:Number,
    required:true
   },
   mentees:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student'
   }]
},

{
 timestamps: true
}
);

TutorSchema.plugin(passportLocalMongoose);
const Tutor=mongoose.model("Tutor", TutorSchema)
module.exports=Tutor;