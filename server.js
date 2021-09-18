'use strict';

require('dotenv').config();
const express =require ('express');
const cors = require('cors');
const server=express();
server.use(cors());
const PORT=process.env.PORT;
server.use(express.json());

let BookModel;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    url: String,
    email: String
  });
  BookModel = mongoose.model('Books', bookSchema);


//   getData()
}

async function getData() {

//   await book1.save()

}
server.get('/',Homehandler)
// http://localhost:3010/updateInfo/:id
server.put('/updatecourse/:id' ,updateHandler)
server.post('/addcourse', addHandler);
// https://localhost:/delete/:id?email=${email}
server.delete('/deletecourse/:id',deleteHandler)

function Homehandler(res,req){
    res.send("HomePage");
}

function deleteHandler(res,req){
    const id = req.params.id;
    const email = req.query.email;
    .deleteOne({:id},(err,result)=>{
        .find({:email},(err,result)=>{
           if(err){
               console.log("Error in handleDelete");
           } else {
               res.send(result);
           }
        })
    })
    }
async function addHandler(req, res) {
    console.log(req.body);
    const courseTitle = req.body.courseTitle;
    const courseDescription = req.body.courseDescription;
    const coursePrice = req.body.coursePrice;
    const courseEmail = req.body.courseEmail;
    // const {courseTitle, courseDescription, coursePrice,courseEmail} = req.body;
    await Modelbook.create({
        courseTitle: courseTitle,
        courseDescription: courseDescription,
        coursePrice: coursePrice,
        courseEmail: courseEmail
    });

    ModelCourse.find({ ownerEmail: courseEmail }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

}
async function updateHandler(req, res)
 {
  const bookId = req.params.id
  const {title,description,status,email} = req.body
  BookModel.findByIdAndUpdate(bookId,{title,description,status}, (error, result) => 
  {
    BookModel.find({ email: email }, (error, result) => 
    {
      if (error) 
      {
        console.log(error);
      }
      else
       {
        res.send(result)
        console.log(result);
      }
    })
  })
}


server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    })