"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
/**
 * generates JWT used for local testing
 */
function generateToken(name, email, id) {
    // information to be encoded in the JWT
    const payload = {
        name: name,
        email: email,
        id: id
    };
    const signInOptions = {
        algorithm: 'HS256',
        expiresIn: '1h'
    };
    // generate JWT
    return (0, jsonwebtoken_1.sign)(payload, `${process.env.TOKEN_KEY}`, signInOptions);
}
exports.default = generateToken;
;
//# sourceMappingURL=generateToken.js.map