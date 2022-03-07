"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
function decodeToken(token) {
    const jwtToken = token;
    if (jwtToken) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(jwtToken, `${process.env.TOKEN_KEY}`);
            return decoded;
        }
        catch (err) {
            throw err;
        }
    }
    else {
        console.log("No JWT token found. Check request parameters.");
    }
}
exports.default = decodeToken;
;
//# sourceMappingURL=decodeToken.js.map