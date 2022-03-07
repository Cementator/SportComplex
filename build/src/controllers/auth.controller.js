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
exports.loginUser = exports.confirmRegistration = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = require("lodash");
const generateToken_1 = __importDefault(require("../services/generateToken"));
const decodeToken_1 = __importDefault(require("../services/decodeToken"));
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
            //hash user password
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            user.password = hashedPassword;
            //saving new user to database
            let newUser = yield user.save();
            //generateJWT token
            const token = (0, generateToken_1.default)(newUser.name, newUser.email, newUser._id);
            //reading html and adding variables in it
            const readFile = (0, util_1.promisify)(fs_1.default.readFile);
            let html = yield readFile('./src/views/registerEmail.html', 'utf8');
            let template = handlebars_1.default.compile(html);
            let data = {
                newUser: newUser.name,
                token: token
            };
            // sending confirmation email
            let htmlToSend = template(data);
            let info = yield transport.sendMail({
                from: "noreply@gmail.com",
                to: newUser.email,
                subject: "Hello there",
                text: "Hello world?",
                html: `${htmlToSend}`, // html body
            });
            newUser = newUser.toObject();
            res.status(201).json((0, lodash_1.omit)(newUser, ['password']));
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.signup = signup;
function confirmRegistration(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenToCheck = req.query.token;
        try {
            const userData = (0, decodeToken_1.default)(tokenToCheck);
            const currentUser = yield user_1.default.findOne({ name: userData.name, email: userData.email });
            if (userData && !currentUser.isVerified) {
                const verifiedUser = yield user_1.default.updateOne({ name: userData.name, email: userData.email }, { $set: { isVerified: true } });
                res.status(200).json({ message: "User is now verified" });
            }
            else {
                res.status(200).json({ message: "User is already verified" });
            }
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.confirmRegistration = confirmRegistration;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get user input
            const { email, password } = req.body;
            // Validate user input
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            // Validate if user exist in our database
            let user = (yield user_1.default.findOne({ email }));
            if (user && (yield bcrypt_1.default.compare(password, user.password))) {
                // Create token
                const token = (0, generateToken_1.default)(user.name, req.body.email, user._id);
                // save user token
                user.token = token;
                // user
                res.status(200).json(user);
            }
            else {
                res.status(400).send("Invalid Credentials");
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.loginUser = loginUser;
//# sourceMappingURL=auth.controller.js.map