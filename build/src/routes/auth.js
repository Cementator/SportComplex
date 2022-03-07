"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
function default_1(app) {
    // Register User
    app.post("/api/register/user", (req, res) => (0, auth_controller_1.signup)(req, res));
    //Confirm registration
    app.patch("/api/confirmRegistration", (req, res) => (0, auth_controller_1.confirmRegistration)(req, res));
    // Login User
    app.post("/api/login", (req, res) => (0, auth_controller_1.loginUser)(req, res));
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map