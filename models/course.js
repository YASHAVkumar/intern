const mongoose=require('mongoose');
const Programme=require('./programmes');
const CourseSchema=mongoose.Schema({
 CourseName:{
   type:String,
   required:true
 },
 CoursePrice:{
  type:Number,
  required:true
 },
  Modules:[
  {
   type: mongoose.Schema.Types.ObjectId,
   ref:'Programme'
 }]
})

const Course=mongoose.model("Course", CourseSchema)
module.exports=Course;