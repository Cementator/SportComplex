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
const TerminSchema = new mongoose_1.default.Schema({
    sport: {
        type: String,
        required: true,
        enum: ["baseball", "basketball", "boxing", "cycling", "fitness", "golf", "running", "swimming", "tennis", "triathlon", "volleyball"]
    },
    age: {
        type: String,
        required: true,
        enum: ["children", "youth", "young adults", "adults"]
    },
    weekSchedule: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    players: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
}, { timestamps: true });
// Validation for players array size
TerminSchema.path('players').validate(function (value) {
    if (value.length > 10) {
        throw new Error("Class cannot have more than 10 players.");
    }
});
const Termin = mongoose_1.default.model("Termin", TerminSchema);
exports.default = Termin;
//# sourceMappingURL=sportClass.js.map