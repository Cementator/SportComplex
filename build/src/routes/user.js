"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const roleAuthorization_1 = __importDefault(require("../middleware/roleAuthorization"));
function default_1(app) {
    // Create User
    app.post("/api/user/create", (0, roleAuthorization_1.default)(["admin"]), (req, res) => (0, user_controller_1.createUser)(req, res));
    //Get single user
    app.get("/api/user/single/:id", (0, roleAuthorization_1.default)(["admin"]), (req, res) => (0, user_controller_1.getSingleUser)(req, res));
    // Get list of users
    app.get("/api/user/all", (0, roleAuthorization_1.default)(["admin"]), (req, res) => (0, user_controller_1.getAllUsers)(req, res));
    //Edit user
    app.patch("/api/user/edit/:id", (0, roleAuthorization_1.default)(["admin"]), (req, res) => (0, user_controller_1.editUser)(req, res));
    //Delete user
    app.delete("/api/user/delete/:id", (0, roleAuthorization_1.default)(["admin"]), (req, res) => (0, user_controller_1.deleteUser)(req, res));
}
exports.default = default_1;
//# sourceMappingURL=user.js.map