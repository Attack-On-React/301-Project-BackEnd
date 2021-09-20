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
const { default: axios } = require('axios');

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


  // getData()
}
// let sample;
// async function getData() {
//   sample=new CourseModel({
//     courseName: 'hi',
//     urlimg: 'hello',
//     unv:item.unv,
//     unvimg:item.unvimg,
//     description:item.description,
//     price:item.price,
// })
// await sample.save()

// }

// http://localhost:3010/coursesData
server.get('/coursesData',getDataHandler)
// http://localhost:3010/updatecourse/:id
server.put('/updatecourse/:id' ,updateHandler)
// http://localhost:3010/addcourse
server.post('/addcourse', addHandler);
// http://localhost:3010/deletecourse/:id?email=${email}
server.delete('/deletecourse/:id',deleteHandler)
// http://localhost:3010/profiledata?email=${email}
server.get('/profiledata',profileDataHandler)
// http://localhost:3010/TechCrunch
server.get('/TechCrunch',techCrunchHandler)
// http://localhost:3010/Topbusiness
server.get('/Topbusiness',topbusinessHandler)
// http://localhost:3010/TeslaArticles
server.get('/TeslaArticles',teslaArticlesHandler)

function techCrunchHandler(req,res){
  const Key=process.env.BLOGS_KEY;
  let techCrunchData=[];

  axios
  .get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${Key}`)
  .then(result=>{

    techCrunchData=result.data.articles.map(item => {
      return new TechCrunch(item)
  })
  res.send(techCrunchData)
  })
  .catch(err=>{
    console.log(err);
  })
}

function TechCrunch(item){
  this.title=item.title
  this.author=item.author
  this.description=item.description
  this.url=item.url
  this.urlToImage=item.urlToImage
}

function topbusinessHandler(req,res){
  const Key=process.env.BLOGS_KEY;
  let topbusinessData=[];

  axios
  .get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${Key}`)
  .then(result=>{

    topbusinessData=result.data.articles.map((item) => {
      return new Topbusiness(item)
  })
  res.send(topbusinessData)
  })
  .catch(err=>{
    console.log(err);
  })
}
function Topbusiness(item){
  this.title=item.title
  this.author=item.author
  this.description=item.description
  this.url=item.url
  this.urlToImage=item.urlToImage
}
function teslaArticlesHandler(req,res){
  const Key=process.env.BLOGS_KEY;
  let teslaArticlesData=[];

  axios
  .get(`https://newsapi.org/v2/everything?q=tesla&from=2021-08-20&sortBy=publishedAt&apiKey=${Key}`)
  .then(result=>{

    teslaArticlesData=result.data.articles.map((item) => {
      return new TeslaArticles(item)
  })
  res.send(teslaArticlesData)
  })
  .catch(err=>{
    console.log(err);
  })
}
function TeslaArticles(item){
  this.title=item.title
  this.author=item.author
  this.description=item.description
  this.url=item.url
  this.urlToImage=item.urlToImage
}


function profileDataHandler(req,res){
    const email=req.query.email
    CourseModel.find({email:email},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
}

function getDataHandler(req,res){
    const gettingData=coursesData.result.map(item=>{
      return item;
    })
    res.send(gettingData)
}
console.log(coursesData.result);

function deleteHandler(req,res){
    const id = req.params.id;
    const email = req.query.email;
    CourseModel.deleteOne({_id:id},(err,result)=>{
      CourseModel.find({email:email},(err,result)=>{
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
async function updateHandler(req, res)
 {
  const CourseId = req.params.id
  const {price,email} = req.body
  CourseModel.findByIdAndUpdate(CourseId,{price}, (err,result) => 
  {
    CourseModel.find({ email: email }, (err, result) => 
    {
      if (err) 
      {
        console.log(err);
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
