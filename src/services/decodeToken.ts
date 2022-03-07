import { verify } from 'jsonwebtoken';
import 'dotenv/config'


export default function decodeToken(token:string) {
    const jwtToken = token
    if(jwtToken){
        try {
            const decoded = verify(jwtToken, `${process.env.TOKEN_KEY}`);
            return decoded
        } catch(err:any) {
            throw err

        }
    } else {
        console.log("No JWT token found. Check request parameters.");
    }

};