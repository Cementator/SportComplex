// @ts-ignore
import {Express, Request, Response} from "express"
import {signup} from "../controllers/auth.controller"


export default function (app: Express){
    // app.get("/register", (req:Request, res:Response)=> res.sendStatus(200)


// Register User
app.post("/api/register/user", (req:Request, res:Response)=> signup(req,res))


// Login User

}