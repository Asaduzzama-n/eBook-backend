import nodemailer from 'nodemailer';
import config from '../../../config';

export async function sendMail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.email,
      pass: config.emailSecret,
    },
  });

  await transporter.sendMail({
    from: config.email, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
}
