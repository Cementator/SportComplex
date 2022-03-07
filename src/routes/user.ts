import {Express, Request, Response} from "express"
import {createUser, getSingleUser, getAllUsers, editUser, deleteUser} from "../controllers/user.controller"


export default function (app: Express){

// Create User
    app.post("/api/user/create", (req:Request, res:Response)=> createUser(req, res))

//Get single user
    app.get("/api/user/single/:id",(req:Request, res:Response)=> getSingleUser(req, res))

// Get list of users
    app.get("/api/user/all", (req:Request, res:Response)=> getAllUsers(req, res))

//Edit user
    app.patch("/api/user/edit/:id", (req:Request, res:Response)=> editUser(req, res))

//Delete user
    app.delete("/api/user/delete/:id", (req:Request, res:Response)=> deleteUser(req, res))
}