var express = require('express');
var router = express.Router();
const Tutor=require('../models/tutor')
const Student=require('../models/student');
const Course=require('../models/course');
const Programme=require('../models/programmes');
const passport=require('passport');
/* GET users listing.*/


const arr={
     CourseName:"Java",
     CoursePrice:4000
   }
    const obj=new Course(arr);
    obj.save();
    console.log("ho gya");
  }

router.get('/',async (req,res,next)=>{
//const obj=await Programme.findById("60dc338ab1d1931030485685");
//   const obj=await Student.findById('60dc0d2b402a7121cca1cfe9');
//   const tut=await Tutor.findById('60dc04111be03811286c3b69');
// //  const course=await Course.findById('60dc321133bc711cecf5a36c');
//    tut.mentees.push(obj);
//    tut.save();
//   console.log(tut);
//    console.log(obj);
   res.send("goal toh hoga kuch");
});

router.post('/',(req,res,next)=>{
     const username = req.body.username.toLowerCase();
     const passport=req.body.passport;
     const tut=req.body.tut;
     console.log(tut);
    if(tut==false)
    {
     Student.findOne({username: username}, (err, user)=>{
         if(err){
            res.status(400).json("Error: "+err);
         }
         if(user){
           console.log(user);
           res.json(user)

         }
     });

     }
     else
       {
          Tutor.findOne({username: username}, (err, user)=>{
               if(err){
                  res.status(400).json("Error: "+err);
               }

               if(user){
                    // console.log(user);
                     res.json(user)
               }
       })
       }

  console.log("ye kya ha");
});

router.get('/:id/students',async(req,res,next)=>{
    const obj=await Tutor.findById(req.params.id);
    var arr=[];
    for(var i=0;i<obj.mentees.length;i++)
    {
       const data=await Student.findById(obj.mentees[i]);
       //console.log(data.id);
     var arr1=[];
       for(var j=0;j<data.courses.length;j++)
       {
          const course=await Course.findById(data.courses[j]);
          var arr2=[];
          for(var k=0;k<course.Modules.length;k++)
          {
              const modules=await Programme.findById(course.Modules[k]);
              arr2.push(modules);
          }
          arr1.push({course:course,modules:arr2});
       }
       arr.push({mentees:data,programmes:arr1});
    }

   res.json(arr);
})

router.post('/tutor',(req,res,next)=>{
     const username = req.body.username;
     tutor.findOne({username: username}, (err, user)=>{
         if(err){
            res.status(400).json("Error: "+err);
         }
         if(user){
           res.json("success")
         }
     });
});

router.get('/registerTutor', (req,res,next)=>{
   const user={
        username:"anjali",
        email:"anjali@gmail.com",
        name:"Anjali",
        phone_no:7833826631,
        highest_degree:"B.E.",
        passed_out_year:2015,
      }
      const pass="Admin@123";
  // await Tutor.register(user,pass);
   res.send("done with registeration");
});



router.get('/registerStudent',(req,res,next)=>{
  const user={
            username:"rajat",
            email:"kumarrajat@gmail.com",
            name:"Rajat",
            class:9,
            phone_no:7822827731,
            city:"Solan",
            tutor:"anjali"
  }
  const pass="Sita@123";
 // await Student.register(user,pass);

  res.send("done with registeration");
});


module.exports = router;




