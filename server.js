'use strict';

require('dotenv').config();
const express =require ('express');
const cors = require('cors');
const server=express();
server.use(cors());
const PORT=process.env.PORT;
server.use(express.json());



server.get('/',Homehandler)





function Homehandler(res,req){
    res.send("HomePage");
}




server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    })