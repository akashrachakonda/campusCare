const express = require("express");
const mysql = require("mysql");
const cors= require("cors");

const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:'b7fkvgitknn65orrpbar-mysql.services.clever-cloud.com',
    user:'upolmgujqzbmeho4',
    password:'Knphj9wwu2FxYUKa3mPl',
    database:'b7fkvgitknn65orrpbar'
})

db.connect();

app.post("/signup",async(req,res)=>{
    const sql="INSERT INTO users_details(`id`, `name`, `email`, `password`, `phone`, `role`) VALUES(?)";
    const values=[
        req.body.id,
        req.body.fullname,
        req.body.email,
        req.body.password,
        req.body.phone,
        req.body.role
    ];
    db.query(sql,[values],(err,data)=>{
        if(err){
        return res.json(err);
        }
        return res.json(data);

    })
})


app.listen(port,()=>{
    console.log(" Listening")
})