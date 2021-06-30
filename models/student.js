const mongoose= require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
require('mongoose-type-email');
const Course=require('./course')
const StudentSchema=mongoose.Schema({
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
  class:{
    type:Number,
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
   tutor:{
   type:String
   },
    courses:[
    {
     type: mongoose.Schema.Types.ObjectId,
     ref:'Course'
    }]
},{
   timestamps: true
  });

StudentSchema.plugin(passportLocalMongoose);
const Student=mongoose.model("Student", StudentSchema)
module.exports=Student;