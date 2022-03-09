import mongoose, {Schema} from "mongoose";

const TerminSchema = new mongoose.Schema({

    sport: {
        type:String,
        required:true,
        enum:["baseball", "basketball", "boxing", "cycling", "fitness", "golf", "running", "swimming", "tennis", "triathlon", "volleyball"]
    },

    age: {
        type: String,
        required:true,
        enum:["children", "youth", "young adults", "adults"]
    },

    weekSchedule: {
        type: Date,
        required:true
    },

    duration:{
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    },

    players:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
    },

    {timestamps:true}
)

// Validation for players array size
TerminSchema.path('players').validate(function (value:any) {

    if (value.length > 10) {
        throw new Error("Class cannot have more than 10 players.");
    }
});

const Termin = mongoose.model("Termin", TerminSchema)

export default Termin