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

db.query("SELECT 1+1 AS SOLUTION", (err,res)=>{

if(err) throw err;
console.log(' The solution is ', res[0].SOLUTION);  
})

app.post("/signup",(req,res)=>{
    const sql="INSERT INTO user_details(`id`,`name`,`email`,`password`,`phone`,`role`) VALUES(?)";
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
        return res.json("ERROR");
        }
        return res.json(data);

    })
})



// app.get('/',(req,res)=>{
// return res.json(" From Backend side");
// });

app.listen(port,()=>{
    console.log(" Listening")
})