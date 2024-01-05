import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;
const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT;
const maildest = process.env.EMAIL_DEST;

export const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: true, // STARTTLS
  auth: {
    user: email,
    pass: pass,
  },
});

export const mailOptions = {
  from: email,
  to: maildest,
};
