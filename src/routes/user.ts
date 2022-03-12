import {Express, Request, Response} from "express"
import {createUser, getSingleUser, getAllUsers, editUser, deleteUser} from "../controllers/user.controller"
import authorize from "../middleware/roleAuthorization";


export default function (app: Express){

// Create User
    app.post("/api/user/create", authorize(["admin"]), (req:Request, res:Response)=> createUser(req, res))

//Get single user
    app.get("/api/user/single/:id", authorize(["admin"]), (req:Request, res:Response)=> getSingleUser(req, res))

// Get list of users
    app.get("/api/user/all", authorize(["admin"]), (req:Request, res:Response)=> getAllUsers(req, res))

//Edit user
    app.patch("/api/user/edit/:id", authorize(["admin"]), (req:Request, res:Response)=> editUser(req, res))

//Delete user
    app.delete("/api/user/delete/:id", authorize(["admin"]), (req:Request, res:Response)=> deleteUser(req, res))
}