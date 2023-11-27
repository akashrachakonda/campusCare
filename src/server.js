import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";
import nodemailer from "nodemailer";

const port = 3001;
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyparser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 10,
    },
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.net",
  port: 587,
  secure: false,
  auth: {
    user: "campuscareuncc@gmail.com",
    pass: "czmb tntr xetw sikt",
  },
});

const emailFunction = async (email, name, otp) => {
  const info = await transporter.sendMail({
    from: '"CampusCare" campuscareuncc@gmail.com',
    to: email || "campuscareuncc@gmail.com",
    subject: "OTP For CampusCare Account Verification",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center;">
      <p>Dear ${name},</p>
      <p>Please enter this code to verify your email</p>
      <h2 style="color: #004525; font-size: 24px; margin: 10px 0;">${otp}</h2>
      <p>If it wasn't you, Please ignore it or call CampusCare customer care.</p>
      <br />
      <p>Regards,</p>
      <p>CampusCare Team</p>
    </div>
  `,
  });

  return info.accepted;
};

const complaintRaisedinfo = async ( name, description) => {
  const info = await transporter.sendMail({
    from: '"CampusCare" campuscareuncc@gmail.com',
    to: "campuscareuncc@gmail.com",
    subject: "New Concern Reported. - CampuCare",
    html: `
  <div style="font-family: Arial, sans-serif; text-align: center;">
    <p>Dear Admin,</p>
    <p>A new concern has been raised by ${name}.</p>
    <h3 style="color: #FF0000; font-size: 18px;">Description Of Concern </h3>
    <h2 style="color: #F76E6E; font-size: 18px; margin-bottom: 10px;"> ${description}</h2>
    <p>Kindly attend to the raised issue at your earliest convenience.</p>
    <br />
    <p>Regards,</p>
    <p>CampusCare Team</p>
  </div>
`,
  });
  return info.accepted;
};


const complaintAddresedinfo = async (email, name, description) => {
  const info = await transporter.sendMail({
    from: '"CampusCare" campuscareuncc@gmail.com',
    to: email || "campuscareuncc@gmail.com",
    subject: "Complaint Addressed - CampuCare",
    html: `
  <div style="font-family: Arial, sans-serif; text-align: center;">
    <p>Dear ${name},</p>
    <p>The concern you raised has been resolved.</p>
    <h2 style="color: #004525; font-size: 18px; margin: 10px 0;">Description : ${description}</h2>
    <p>If it wasn't raised by you, Please call CampusCare customer service.</p>
    <br />
    <p>Regards,</p>
    <p>CampusCare Team</p>
  </div>
`,
  });
  return info.accepted;
};


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
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      req.session.username = data[0].name;
      return res.json({
        Login: true,
        username: req.session.username,
        id: data[0].id,
        password: data[0].password,
      });
    } else {
      return res.json({ Login: false });
    }
  });
});

app.post("/complaintsList", async (req, res) => {
  const sql = "SELECT * from complaints where id = ?";
  db.query(sql, [req.body.userId], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      return res.json({ previousComplaints: true, complaints: data });
    } else {
      return res.json({ previousComplaints: false });
    }
  });
});

app.get("/allcomplaintsList", async (req, res) => {
  const sql = "SELECT * from complaints";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      return res.json({ Complaints: true, complaintsData: data });
    } else {
      return res.json({ Complaints: false });
    }
  });
});

app.post("/signup", async (req, res) => {
  emailFunction(req.body.email, req.body.fullname, req.body.otp);

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
  complaintRaisedinfo(req.body.name,req.body.description);
  const sql =
    "INSERT INTO complaints(`name`,`email`,`phone`, `description`,`id`,`status`,`complaintId`) VALUES(?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.description,
    req.body.id,
    req.body.status,
    req.body.complaintId,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.put("/update", async (req, res) => {
  complaintAddresedinfo(req.body.email, req.body.name, req.body.description);
  const sql = "UPDATE complaints SET status='Addressed' WHERE complaintId=?";
  const values = [req.body.complaintId];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log("Server is Listening in port 3001");
});

export { emailFunction };
