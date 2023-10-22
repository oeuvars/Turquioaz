"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (email, mailSubject, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transport = nodemailer_1.default.createTransport({
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
        const info = yield transport.sendMail(mailOptions);
        console.log("Mail Sent Successfully!", info.response);
    }
    catch (error) {
        console.error("Error sending email:", error.message);
    }
});
exports.sendMail = sendMail;
