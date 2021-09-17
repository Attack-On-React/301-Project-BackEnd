'use strict';

require('dotenv').config();
const express =require ('express');
const cors = require('cors');
const server=express();
server.use(cors());
const PORT=process.env.PORT;
server.use(express.json());



server.get('/',Homehandler)
// https://localhost:/delete/:id?email=${email}
server.delete('/delete/:id',handleDelete)





function Homehandler(res,req){
    res.send("HomePage");
}

function handleDelete(res,req){
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
       






server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    })