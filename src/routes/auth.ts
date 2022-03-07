import {Express, Request, Response} from "express"
import {confirmRegistration, signup, loginUser} from "../controllers/auth.controller"


export default function (app: Express){

// Register User
app.post("/api/register/user", (req:Request, res:Response)=> signup(req, res))

//Confirm registration
app.patch("/api/confirmRegistration",(req:Request, res:Response)=> confirmRegistration(req, res))

// Login User
app.post("/api/login", (req:Request, res:Response)=> loginUser(req, res))

}