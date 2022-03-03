"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
function default_1(app) {
    // app.get("/register", (req:Request, res:Response)=> res.sendStatus(200)
    // Register User
    app.post("/api/register/user", (req, res) => (0, auth_controller_1.signup)(req, res));
    // Login User
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map