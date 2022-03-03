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
exports.signup = void 0;
const user_1 = __importDefault(require("../modules/user"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
// register user with an email
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.default({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age
        });
        let transport = nodemailer_1.default.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: `${process.env.MAIL_USERNAME}`,
                pass: `${process.env.MAIL_PASSWORD}`
            }
        });
        try {
            const newUser = yield user.save();
            let info = yield transport.sendMail({
                from: "noreply@gmail.com",
                to: newUser.email,
                subject: "Hello ✔",
                text: "Hello world?",
                html: `<h1>Email Confirmation</h1>
        <h2>Hello ${newUser.name}</h2>
        <p>Thank you for joining. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8081/confirm/> Click here</a>
        </div>`, // html body
            });
            res.status(201).json(newUser);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.signup = signup;
//# sourceMappingURL=auth.controller.js.map