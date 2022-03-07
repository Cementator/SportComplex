import User from "../models/user"
import {json} from "express";
import nodemailer from "nodemailer";
import 'dotenv/config'
import handlebars from "handlebars";
import fs from "fs";
import {promisify} from "util";
import bcrypt from "bcrypt";
import express from  "express";
import {omit} from "lodash";
import generateToken from "../services/generateToken"
import decodeToken from "../services/decodeToken"



// register user with an email

export async function signup(req:any, res:any) {

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age
    })



    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: `${process.env.MAIL_USERNAME}`,
            pass: `${process.env.MAIL_PASSWORD}`
        }
    });

    try {

        //hash user password
        const hashedPassword:string = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword

        //saving new user to database
        let newUser = await user.save()

        //generateJWT token
        const token = generateToken(newUser.name, newUser.email, newUser._id)

        //reading html and adding variables in it
        const readFile = promisify(fs.readFile);
        let html = await readFile('./src/views/registerEmail.html', 'utf8');
        let template = handlebars.compile(html);
        let data = {
            newUser: newUser.name,
            token: token
        };

        // sending confirmation email
        let htmlToSend = template(data);

        let info = await transport.sendMail({
            from: "noreply@gmail.com", // sender address
            to: newUser.email, // sender addresslist of receivers
            subject: "Hello there", // Subject line
            text: "Hello world?", // plain text body
            html: `${htmlToSend}`, // html body
        });
        newUser = newUser.toObject()
        res.status(201).json(omit(newUser, ['password']))

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }

}

export async function confirmRegistration(req:any, res:any) {
    const tokenToCheck:string = req.query.token;

    try {
        const userData:any = decodeToken(tokenToCheck)
        const currentUser:any = await User.findOne({name: userData.name, email: userData.email})

        if (userData && !currentUser.isVerified){
            const verifiedUser = await User.updateOne({name: userData.name, email: userData.email}, {$set: {isVerified:true}})
            res.status(200).json({message: "User is now verified"})
        }else {
            res.status(200).json({message: "User is already verified"})
        }

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }

}

export async function loginUser(req: any, res: any) {

    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        let user = (await User.findOne({ email }));

        if (user && (await bcrypt.compare(password, user.password))) {

            // Create token
            const token = generateToken(user.name, req.body.email, user._id)

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }else {

            res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.log(err);
    }

}