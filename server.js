'use strict';

require('dotenv').config();
const express =require ('express');
const cors = require('cors');
const server=express();
server.use(cors());
const PORT=process.env.PORT;
server.use(express.json());



server.get('/',Homehandler)
server.post('/course', addCourse);




function Homehandler(res,req){
    res.send("HomePage");
}



async function addCourse(req, res) {
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

    // await KittenModel.create({catName,catBreed,ownerEmail});

    ModelCourse.find({ ownerEmail: courseEmail }, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

}












server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    })