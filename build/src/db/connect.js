"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const default_1 = __importDefault(require("../../config/default"));
require('dotenv').config();
function connect() {
    const dbUrl = default_1.default.dbUrl;
    return mongoose_1.default.connect(dbUrl)
        .then(() => { console.log("Connected to database"); })
        .catch((error) => {
        console.log(error);
        process.exit(1);
    });
}
exports.default = connect;
//# sourceMappingURL=connect.js.map