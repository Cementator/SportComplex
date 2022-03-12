import {Express, Request, Response} from "express"
import {createClass, getSingleClass, getAllClasses, editClass, deleteClass, enrollUnenrollClass, rateAndComment} from "../controllers/class.controller"
import authorize from "../middleware/roleAuthorization"


export default function (app: Express){

// Create Class
    app.post("/api/class/create", authorize(["admin"]), (req:Request, res:Response)=> createClass(req, res))

//Get single class
    app.get("/api/class/single/:id", authorize(["admin", "user"]),  (req:Request, res:Response)=> getSingleClass(req, res))

// Get list of classes
    app.get("/api/class/all", authorize(["admin", "user"]), (req:Request, res:Response)=> getAllClasses(req, res))

//Edit class
    app.patch("/api/class/edit/:id", authorize(["admin"]), (req:Request, res:Response)=> editClass(req, res))

//Delete class
    app.delete("/api/class/delete/:id", authorize(["admin"]), (req:Request, res:Response)=> deleteClass(req, res))

//Enroll and unenroll from a class
    app.patch("/api/class/enroll/:id", authorize(["admin", "user"]), (req:Request, res:Response)=> enrollUnenrollClass(req, res))

//Rate and comment class
    app.patch("/api/class/rateandcomment/:id", authorize(["admin", "user"]), (req:Request, res:Response)=> rateAndComment(req, res))
}