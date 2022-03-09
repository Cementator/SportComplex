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

    enrolled:[{ type: Schema.Types.ObjectId, ref: 'Class', default: [] }]

},

    {timestamps:true}
)

// Validation for enrolled classes
UserSchema.path('enrolled').validate(function (value:any) {

    if (value.length > 2) {
        throw new Error("User cannot join more than two classes.");
    }
});

const User = mongoose.model("User", UserSchema)

export default User