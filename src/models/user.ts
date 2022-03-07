import mongoose, {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
        minLength:6,
        select: false
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
    token: {
        type:String,
    },
    enrolled:{
        type:[String],
        default:[]
    }

},
    {timestamps:true}
)

const User = mongoose.model("User", UserSchema)

export default User