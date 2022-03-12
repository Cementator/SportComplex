import User from "../models/user"
import {omit} from "lodash";
import bcrypt from "bcrypt";



export async function createUser(req:any, res:any){

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        role: req.body.role,
        isVerified: true
    })
    try {

        //hash user password
        const hashedPassword:string = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword

        //saving new user to database
        let newUser = await user.save()

        newUser = newUser.toObject()

        res.status(201).json(omit(newUser, ['password']))

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }



}

export async function getSingleUser(req:any, res:any){


    try {

        let currentUser:any = await User.findOne({_id: req.params.id})

        res.status(200).json(currentUser)

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }
}

export async function getAllUsers(req:any, res:any){

    try {

        let listOfUsers:any = await User.find()

        const page:number = req.query.page
        const limit:number = req.query.limit

        const startIndex:number = (page -1) * limit
        const endIndex:number = page * limit

        const pagedUsers:any = listOfUsers.slice(startIndex, endIndex)
        const totalPages:number = Math.ceil(listOfUsers.length / limit)


        if(pagedUsers.length === 0){
            res.status(200).json(listOfUsers)

        }else {
            res.status(200).json([{pagedUsers}, {totalPages: totalPages}])
        }


    }catch (e:any) {

        res.status(400).json({message: e.message})
    }
}



export async function editUser(req:any, res:any){

    const data:{ password: string} = req.body

    try {
        if(data.password){
            //hash user password
            const hashedPassword:string = await bcrypt.hash(data.password, 10)
            data.password = hashedPassword
        }

        let currentUser:any = await User.updateOne({_id: req.params.id}, {$set: data}, { runValidators: true })

        res.status(200).json(currentUser)

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }

}

export async function deleteUser(req:any, res:any){

    try {
        if ((req.params.id).match(/^[0-9a-fA-F]{24}$/)) {

            const user:any = await User.findOne({_id: req.params.id})


            if(user === null){
                res.status(404).json({message: "User with this id does not exist."})

            }else {
                await User.deleteOne({_id: req.params.id})

                res.status(200).json({message: "User deleted successfully."})
            }

        } else {
            res.status(400).json({message: "Wrong id format."})
        }

    }catch (e:any) {

        res.status(400).json({message: e.message})
    }

}