import Termin from "../models/sportClass"
import {omit} from "lodash";
import User from "../models/user";
import moment from "moment";
import bcrypt from "bcrypt";
import decodeToken from "../services/decodeToken"




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

        if(now.isBefore(timeOfTermin) === false){

            return res.status(400).json({message:"You have entered termin date in the past. "})
        }


        const existingTermin:any = await Termin.findOne({sport: req.body.sport, weekSchedule: req.body.weekSchedule, age: req.body.age})

        if (existingTermin !== null){

            return res.status(400).json({message: "Termin for given sport already exists."})
        }

        //saving new sports termin to the database
        let newTermin = await termin.save()

        //time returned here is UTC time as all times saved in mongo DB are UTC
        res.status(201).json(newTermin)


    }catch (e:any) {

        res.status(400).json({message: e.message})
    }


}

export async function getSingleClass(req:any, res:any){

    const userData:any = decodeToken((req.headers.authorization).replace('Bearer ',''))

    try {

        let singleTermin:any = {}

        if(userData.role === "admin"){
            singleTermin = await Termin.findOne({_id: req.params.id})

        }else if(userData.role === "user"){
            singleTermin = await Termin.findOne({_id: req.params.id}).select(['-averageRating', '-comments', '-ratings'])
        }

        res.status(200).json(singleTermin)

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }

}

export async function getAllClasses(req:any, res:any){

    // filter object setup for mongoose find function
    let sport:any = undefined

    let age:any = undefined

    let filterObject:{} = {}

    if(req.query.sport){
        sport = req.query.sport.split(',')
        // @ts-ignore
        filterObject['sport'] = sport;
    }

    if(req.query.age){
        age = req.query.age.split(',')
        // @ts-ignore
        filterObject['age'] = age;
    }

    try {

        let listOfClasses:any = await Termin.find(filterObject).select(['-averageRating', '-comments', '-ratings'])

        const page:number = req.query.page

        const limit:number = req.query.limit

        const startIndex:number = (page -1) * limit

        const endIndex:number = page * limit

        const totalPages:number = Math.ceil(listOfClasses.length / limit)

        const pagedClasses:any = listOfClasses.slice(startIndex, endIndex)


        if(pagedClasses.length === 0){
            res.status(200).json(listOfClasses)

        }else {
            res.status(200).json([{pagedClasses}, {totalPages: totalPages}])
        }


    }catch (e:any) {

        res.status(400).json({message: e.message})
    }


}



export async function editClass(req:any, res:any){

    const data:{} = req.body

    try {

        let updatedTermin:any = await Termin.updateOne({_id: req.params.id}, {$set: data}, { runValidators: true })

        res.status(200).json(updatedTermin)

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }

}

export async function deleteClass(req:any, res:any){

    try {
        if ((req.params.id).match(/^[0-9a-fA-F]{24}$/)) {

            const termin:any = await Termin.findOne({_id: req.params.id})


            if(termin=== null){
                res.status(404).json({message: "Termin with this id does not exist."})

            }else {
                await Termin.deleteOne({_id: req.params.id})

                res.status(200).json({message: "Termin deleted successfully."})
            }

        } else {
            res.status(400).json({message: "Wrong id format."})
        }

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }



}

export async function enrollUnenrollClass(req:any, res:any){

    const userData:any = decodeToken((req.headers.authorization).replace('Bearer ',''))

    let singleTermin:any = {}

    try{
        singleTermin = await Termin.findOne({_id: req.params.id})

    }catch (e:any) {

        res.status(400).json({message: e.message})
        return

    }

    if(userData.age !== singleTermin.age){


        res.status(400).json({message: "User is not in the same age group as the class."})
        return
    }


    try {

        // if user is already enrolled - unenroll him (checking his id)
        if(singleTermin.players.includes(userData.id)){

            await Termin.updateOne({_id: req.params.id}, {$pull:{ players: userData.id}})

            await User.updateOne({_id: userData.id}, {$pull:{ enrolled: singleTermin._id}})

            res.status(200).json({message: "User unenrolled."})
        }

        // if there is no user id inside players array enroll him in this class
        else if(!singleTermin.players.includes(userData.id)){

            if(singleTermin.players.length >= 10){
                res.status(400).json({message: "Termin is full."})

            } else if(userData.enrolled.length >= 2) {
                res.status(400).json({message: "User is already enrolled on 2 classes."})

            }else{

                await Termin.updateOne({_id: req.params.id}, {$push:{ players: userData.id}})

                await User.updateOne({_id: userData.id}, {$push:{ enrolled: singleTermin._id}})

                res.status(200).json({message: "User enrolled in class."})
            }

        } else{

            res.status(400).json({message: "Wrong termin id."})

            return
        }

    } catch (e:any) {

        res.status(400).json({message: e.message})

    }
}


export async function rateAndComment(req:any, res:any){

    // getting all data required for calculations and update
    const userData:any = decodeToken((req.headers.authorization).replace('Bearer ',''))

    let singleTermin:any = {}

    try{
        singleTermin = await Termin.findOne({_id: req.params.id})

    }catch (e:any) {

        res.status(400).json({message: e.message})
        return

    }

    const comment:string = req.body.comment

    const rating:number = req.body.rating

    let averageRating:any = singleTermin.averageRating

    let arrayOfRatings:any= []

    // declare object in which we declare updates
    let objectForUpdate:any = {}

    // check if user has already rated this termin
    const alreadyRated:boolean = singleTermin.ratings.some((element:any) => {
        return element.byUser === userData.id
    })

    // check if rating and comment exist and add them to the update object
    if(alreadyRated === false && rating){
        if(rating > 5 || rating < 1){
            res.status(400).json({message: "Rating value must be between 1 and 5."})
            return
        }

        objectForUpdate['ratings'] = {
            rating: rating,
            byUser: userData.id
        }

        // calculating average rating only when new rating is added otherwise it stays the same
        singleTermin.ratings.forEach((element:any) => {
            arrayOfRatings.push(element.rating)
        })

        // push new rating
        arrayOfRatings.push(rating)

        //calculating average rating from array of ratings
        averageRating = (arrayOfRatings.reduce(
            (previousValue:any, currentValue:any) => previousValue + currentValue, 0))/arrayOfRatings.length
    }

    if(comment) {
        objectForUpdate['comments'] = {
            text: comment
        }
    }

    // check if there is anything to update
    const numberOfUpdates = Object.keys(objectForUpdate).length;


    try {

        // Push object for update if there is any and set averageRating
        if(numberOfUpdates !== 0){
            await Termin.updateOne({_id: req.params.id}, {$push:objectForUpdate, $set:{ averageRating: averageRating}})

            res.status(200).json({message: "Comment and rating saved successfully."})

        } else {

            res.status(400).json({message: "Nothing to update"})

        }


    }catch (e:any) {

        res.status(400).json({message: e.message})
    }


}