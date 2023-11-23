const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.net",
  port: 587,
  secure: false,
  auth: {
    user: "akashrachakonda1998@gmail.com",
    pass: "odsj nqpb ibog qnpi",
  },
});

export const email = async (email) => {
  const info = await transporter.sendMail({
    from: '"CampusCare" akashrachakonda1998@gmail.com',
    to: email,
    subject: "Hello TejaRaja....",
    //text: "Hello Mr.Teja, this is regarding Campuscare email Verification.",
    html: "<b>Hello Mr.Teja, this is regarding Campuscare email Verification.</b>",
  });

  console.log("Message sent: %s", info.accepted);
};

email().catch(console.error);
