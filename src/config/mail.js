const nodemailer = require("nodemailer");

require("dotenv").config({path: "./.env"});

module.exports =  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 465,
    secure: false, 
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });