import Termin from "../models/sportClass"
import {omit} from "lodash";
import User from "../models/user";
import moment from "moment";




export async function createClass(req:any, res:any){

    const termin = new Termin({
        sport: req.body.sport,
        age: req.body.age,
        weekSchedule: req.body.weekSchedule,
        duration: req.body.duration,
        description: req.body.description,
        players: req.body.players,

    })

    try {

        const now = moment()
        const timeOfTermin = moment(req.body.weekSchedule)
        const timeGG = moment("2022-03-13 18:00:00").format("x")
        console.log(timeOfTermin)
        console.log(timeGG)

        if(now.isBefore(timeOfTermin) === false){

            return res.status(400).json({message:"You have entered termin date in the past. "})
        }


        const existingTermin:any = await Termin.findOne({sport: req.body.sport, weekSchedule: req.body.weekSchedule, age: req.body.age})

        if (existingTermin !== null){

            return res.status(400).json({message: "Termin for given sport already exists."})
        }

        //saving new sports termin to the database
        let newTermin = await termin.save()

        res.status(201).json(newTermin)


    }catch (e:any) {

        res.status(400).json({message: e.message})
    }


}

export async function getSingleClass(req:any, res:any){



}

export async function getAllClasses(req:any, res:any){


}



export async function editClass(req:any, res:any){



}

export async function deleteClass(req:any, res:any){



}