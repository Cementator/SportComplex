import User from "../modules/user"
import {json} from "express";
import nodemailer from "nodemailer";
import 'dotenv/config'
import html from "../views/emailConfirm"


// register user with an email

export async function signup(req:any,res:any) {
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


        const newUser = await user.save()
        let info = await transport.sendMail({
            from: "noreply@gmail.com", // sender address
            to: newUser.email, // sender addresslist of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${newUser.name}</h2>
        <p>Thank you for joining. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8081/confirm/> Click here</a>
        </div>`, // html body
        });

        res.status(201).json(newUser)
    }catch (e:any) {
        res.status(400).json({message: e.message})
    }

}