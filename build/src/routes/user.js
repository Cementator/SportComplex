"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
function default_1(app) {
    // Create User
    app.post("/api/user/create", (req, res) => (0, user_controller_1.createUser)(req, res));
    //Get single user
    app.get("/api/user/single/:id", (req, res) => (0, user_controller_1.getSingleUser)(req, res));
    // Get list of users
    app.get("/api/user/all", (req, res) => (0, user_controller_1.getAllUsers)(req, res));
    //Edit user
    app.patch("/api/user/edit/:id", (req, res) => (0, user_controller_1.editUser)(req, res));
    //Delete user
    app.delete("/api/user/delete/:id", (req, res) => (0, user_controller_1.deleteUser)(req, res));
}
exports.default = default_1;
//# sourceMappingURL=user.js.map