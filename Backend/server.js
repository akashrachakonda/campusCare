const express = require("express");
const mysql=require("mysql");
const cors=require("cors");
const session= require("express-session");
const cookieParser=require("cookie-parser");
const bodyparser=require("body-parser");

const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json())
app.use(session({
secret:"secret",
resave:false,
saveUninitialized:false,
cookie:{
    secure:false,
    maxAge:1000*60*10
}
}));

const db = mysql.createConnection({
  host: "b7fkvgitknn65orrpbar-mysql.services.clever-cloud.com",
  user: "upolmgujqzbmeho4",
  password: "Knphj9wwu2FxYUKa3mPl",
  database: "b7fkvgitknn65orrpbar",
});

db.connect();



app.post("/login", async (req, res) => {
  const sql = "SELECT * from users_details where email = ? and password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    console.log("data--",data)
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
        req.session.username=data[0].name;
        //localStorage.setItem('username', req.session.username);
       // console.log(" req.session.username", req.session.username)
      return res.json({ Login: true,username:req.session.username});
    } else {
      return res.json({ Login: false });
    }
  });
});

app.post("/signup", async (req, res) => {
  const sql =
    "INSERT INTO users_details(`id`, `name`, `email`, `password`, `phone`, `role`) VALUES(?)";
  const values = [
    req.body.id,
    req.body.fullname,
    req.body.email,
    req.body.password,
    req.body.phone,
    req.body.role,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

// app.get('/',(req,res)=>{
//   //console.log("get---->",localStorage.getItem('username'))
//     if(req.session.username){
//       return res.json({valid:true})
//     }
//     else{
//       return res.json({valid:false})
//     }
//   })

app.listen(port, () => {
  console.log(" Listening");
});
