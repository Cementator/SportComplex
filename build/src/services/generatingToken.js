"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
/**
 * generates JWT used for local testing
 */
function generateToken(name, email) {
    // information to be encoded in the JWT
    const payload = {
        name: name,
        email: email,
    };
    const signInOptions = {
        // RS256 uses a public/private key pair. The API provides the private key
        // to generate the JWT. The client gets a public key to validate the
        // signature
        algorithm: 'RS256',
        expiresIn: '1h'
    };
    // generate JWT
    return (0, jsonwebtoken_1.sign)(payload, `${process.env.TOKEN_KEY}`, signInOptions);
}
exports.generateToken = generateToken;
;
//# sourceMappingURL=generatingToken.js.map