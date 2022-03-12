import { sign, SignOptions } from 'jsonwebtoken';
import 'dotenv/config'

/**
 * generates JWT used for local testing
 */
export default function generateToken(name:string, email:string, id:string, role:string, enrolled:string[], age:string) {
    // information to be encoded in the JWT
    const payload = {
        name: name,
        email: email,
        id:id,
        role: role,
        enrolled:enrolled,
        age:age

    };

    const signInOptions: SignOptions = {
        algorithm: 'HS256',
        expiresIn: '1h'
    };

    // generate JWT
    return sign(payload, `${process.env.TOKEN_KEY}`, signInOptions)

};