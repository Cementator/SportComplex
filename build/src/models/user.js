"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
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
    token: {
        type: String,
    },
    enrolled: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Class', default: [] }]
}, { timestamps: true });
// Validation for enrolled classes
UserSchema.path('enrolled').validate(function (value) {
    if (value.length > 2) {
        throw new Error("User cannot join more than two classes.");
    }
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=user.js.map