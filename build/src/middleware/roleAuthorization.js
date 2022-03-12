"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const decodeToken_1 = __importDefault(require("../services/decodeToken"));
function authorize(userRole) {
    return function (req, res, next) {
        // @ts-ignore
        let token = "";
        if (req.headers.authorization) {
            token = (req.headers.authorization).replace('Bearer ', '');
        }
        else {
            res.status(400).send({ message: "No authorization header token." });
            return;
        }
        try {
            const decodedToken = (0, decodeToken_1.default)(token);
            if (userRole.includes(decodedToken.role)) {
                next();
            }
            else {
                res.status(400).send("You do not have permission.");
                return;
            }
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    };
}
exports.default = authorize;
//# sourceMappingURL=roleAuthorization.js.map