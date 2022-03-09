import {Express, Request, Response} from "express"
import {createClass, getSingleClass, getAllClasses, editClass, deleteClass} from "../controllers/class.controller"


export default function (app: Express){

// Create Class
    app.post("/api/class/create", (req:Request, res:Response)=> createClass(req, res))

//Get single class
    app.get("/api/class/single/:id",(req:Request, res:Response)=> getSingleClass(req, res))

// Get list of classes
    app.get("/api/class/all", (req:Request, res:Response)=> getAllClasses(req, res))

//Edit class
    app.patch("/api/class/edit/:id", (req:Request, res:Response)=> editClass(req, res))

//Delete class
    app.delete("/api/class/delete/:id", (req:Request, res:Response)=> deleteClass(req, res))
}