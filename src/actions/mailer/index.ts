"use server";
import nodemailer from "nodemailer";

export const onMailer = (email: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSOWRD,
    },
  });

  const mailOptions = {
    to: email,
    subject: "Realtime Support",
    text: "One of your customers on MarkBot, just switched to real time mode",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent" + info.response);
    }
  });
};
