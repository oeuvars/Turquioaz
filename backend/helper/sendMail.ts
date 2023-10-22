import nodemailer from "nodemailer";

export const sendMail = async (
  email: string,
  mailSubject: string,
  content: string
) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "www.anuragniall@gmail.com",
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: "www.anuragniall@gmail.com",
      to: email,
      subject: mailSubject,
      html: content,
    };

    const info = await transport.sendMail(mailOptions);

    console.log("Mail Sent Successfully!", info.response);
  } catch (error: any) {
    console.error("Error sending email:", error.message);
  }
};
