'use strict';

require('dotenv').config();
const express =require ('express');
const cors = require('cors');
const server=express();
server.use(cors());
const PORT=process.env.PORT;
server.use(express.json());

// Nedal & Bashar update method
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

// http://localhost:3010/updateInfo/:id
server.get('/',Homehandler)
server.put('/updateInfo/:id' ,updateHandler)

function Homehandler(res,req){
    res.send("HomePage");
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