const mongoose=require('mongoose');
const ProgrammeSchema=mongoose.Schema({
 modName:{
   type:String,
 },
 completed:{
  type:Boolean,
 }
})

const Programme=mongoose.model("Programme", ProgrammeSchema)
module.exports=Programme;