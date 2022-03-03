"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: String,
        required: true,
        enum: ["children", "youth", "young adults", "adults"]
    },
    role: {
        type: String,
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map