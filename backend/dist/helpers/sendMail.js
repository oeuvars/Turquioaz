"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async (email, mailSubject, content) => {
    try {
        const transport = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "turquioaze@gmail.com",
                pass: process.env.password,
            },
        });
        const mailOptions = {
            from: "Turquioaz",
            to: email,
            subject: mailSubject,
            html: content,
        };
        const info = await transport.sendMail(mailOptions);
        console.log("Mail Sent Successfully!", info.response);
    }
    catch (error) {
        console.error("Error sending email:", error.message);
    }
};
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map