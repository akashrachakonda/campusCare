const express = require("express");
const mysql=require("mysql");
const cors=require("cors");
const session= require("express-session");
const cookieParser=require("cookie-parser");
const bodyparser=require("body-parser");

const port = 3001;
const app = express();
app.use(cookieParser());
app.use(cors({
  origin:["http://localhost:5173"],
  methods:["POST","GET","PUT"],
  credentials:true
}));
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
    console.log("data--logindetails",data);
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
        req.session.username=data[0].name;
      return res.json({ Login: true,username:req.session.username,id:data[0].id,password:data[0].password});
    } else {
      return res.json({ Login: false });
    }
  });
});

app.post("/complaintsList", async (req, res) => {
  const sql = "SELECT * from complaints where id = ?";
  db.query(sql, [req.body.userId], (err, data) => {
    console.log("data--",data)
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      return res.json({ previousComplaints: true,complaints:data});
    } else {
      return res.json({ previousComplaints: false });
    }
  }); 
});

app.get("/allcomplaintsList", async (req, res) => {
  const sql = "SELECT * from complaints";
  db.query(sql, (err, data) => {
    console.log("data--",data)
    if (err) {
      return res.json(err); 
    }
    if (data.length > 0) {
      return res.json({ Complaints: true,complaintsData:data});
    } else {
      return res.json({ Complaints: false });
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


app.post("/complaints", async (req, res) => {
  const sql =
    "INSERT INTO complaints(`name`,`email`,`phone`, `description`,`id`,`status`,`complaintId`) VALUES(?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.description,
    req.body.id,
    req.body.status,
    req.body.complaintId
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.put("/update", async (req, res) => {
  const sql =
    "UPDATE complaints SET status='Addressed' WHERE complaintId=?";
  const values = [
    req.body.complaintId,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});


app.listen(port, () => {
  console.log(" Listening");
});
