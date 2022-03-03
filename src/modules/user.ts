import mongoose, {Schema} from "mongoose";

// export interface UserDocument extends mongoose.Document{
//     name: string;
//     password: string;
//     email: string;
//     age: string;
//     role: string;
//     isVerified:boolean;
//     createdAt: Date;
//     updatedAt: Date;
//
// }


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
        minLength:6
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    age: {
        type: String,
        required:true,
        enum:["children", "youth", "young adults", "adults"]
    },
    role: {
        type:String,
        default:"user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },

},
    {timestamps:true}
)

const User = mongoose.model("User", UserSchema)

export default User