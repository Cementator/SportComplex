import { NextFunction, Request, Response } from "express"
import decodeToken from "../services/decodeToken"

export default function authorize(userRole:string[]){

        return function(req:Request, res:Response, next:NextFunction) {

                // @ts-ignore
            let token:string = ""

            if(req.headers.authorization){
                token =(req.headers.authorization).replace('Bearer ','')

            } else {
                res.status(400).send({message: "No authorization header token."})
                return
            }

            try {
                const decodedToken:any= decodeToken(token)

                if (userRole.includes(decodedToken.role)){
                    next()

                }
                else {
                    res.status(400).send("You do not have permission.")
                    return
                }


            } catch (e:any) {

                res.status(400).json({message: e.message})
            }

        }

}