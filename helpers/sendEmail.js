require("dotenv").config();
const nodemailer = require("nodemailer");

const { MAILER_MAIL, MAILER_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: MAILER_MAIL,
    pass: MAILER_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: MAILER_MAIL };
  transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
