'use strict';

require('dotenv').config();
const express =require ('express');
const cors = require('cors');
const server=express();
server.use(cors());
const PORT=process.env.PORT;
server.use(express.json());
const coursesData=require('./data.json')

let CourseModel;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect(process.env.MONGO_URL);
  await mongoose.connect('mongodb://localhost:27017/courses');

  const courseSchema = new mongoose.Schema({
    courseName: String,
    urlimg: String,
    unv: String,
    unvimg: String,
    description: String,
    price: String,
    email: String
  });
  CourseModel = mongoose.model('courses', courseSchema);


//   getData()
}
// let sample;
// async function getData() {
//    coursesData.result.map(item=>{
//   sample=new CourseModel({
//     courseName: item.courseName,
//     urlimg: item.urlimg,
//     unv:item.unv,
//     unvimg:item.unvimg,
//     description:item.description,
//     price:item.price,
//   })
// })
// await sample.save()

// }
// http://localhost:3010/coursesData
server.get('/coursesData',getDataHandler)
// server.get('/',Homehandler)
// http://localhost:3010/updateInfo/:id
// server.put('/updatecourse/:id' ,updateHandler)
// http://localhost:3010/addcourse
server.post('/addcourse', addHandler);
// http://localhost:3010/delete/:id?email=${email}
// server.delete('/deletecourse/:id',deleteHandler)

// function Homehandler(req,res){
//     res.send("HomePage");
// }

function getDataHandler(req,res){
    const gettingData=coursesData.result.map(item=>{
      return item;
    })
    res.send(gettingData)
}
console.log(coursesData.result);

// function deleteHandler(req,res){
//     const id = req.params.id;
//     const email = req.query.email;
//     .deleteOne({:id},(err,result)=>{
//         .find({:email},(err,result)=>{
//            if(err){
//                console.log("Error in handleDelete");
//            } else {
//                res.send(result);
//            }
//         })
//     })
//     }
async function addHandler(req, res) {
    console.log(req.body);
const{courseName,urlimg,unv,unvimg,description,price,email}=req.body

    await CourseModel.create({
        courseName:courseName,
        urlimg:urlimg,
        unv:unv,
        unvimg:unvimg,
        description:description,
        price:price,
        email:email
    });

    CourseModel.find({ email: email }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

}
// async function updateHandler(req, res)
//  {
//   const bookId = req.params.id
//   const {title,description,status,email} = req.body
//   BookModel.findByIdAndUpdate(bookId,{title,description,status}, (error, result) => 
//   {
//     BookModel.find({ email: email }, (error, result) => 
//     {
//       if (error) 
//       {
//         console.log(error);
//       }
//       else
//        {
//         res.send(result)
//         console.log(result);
//       }
//     })
//   })
// }


server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    })