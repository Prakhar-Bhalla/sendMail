const nodemailer = require("nodemailer");

//require("dotenv").config();

module.exports =  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 465,
    secure: false, 
    auth: {
      user: "11ede0def0f68e",
      pass: "a3fb03dfc779e2",
    },
  });