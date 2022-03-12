"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_controller_1 = require("../controllers/class.controller");
const roleAuthorization_1 = __importDefault(require("../middleware/roleAuthorization"));
function default_1(app) {
    // Create Class
    app.post("/api/class/create", (0, roleAuthorization_1.default)(["admin"]), (req, res) => (0, class_controller_1.createClass)(req, res));
    //Get single class
    app.get("/api/class/single/:id", (0, roleAuthorization_1.default)(["admin", "user"]), (req, res) => (0, class_controller_1.getSingleClass)(req, res));
    // Get list of classes
    app.get("/api/class/all", (0, roleAuthorization_1.default)(["admin", "user"]), (req, res) => (0, class_controller_1.getAllClasses)(req, res));
    //Edit class
    app.patch("/api/class/edit/:id", (0, roleAuthorization_1.default)(["admin"]), (req, res) => (0, class_controller_1.editClass)(req, res));
    //Delete class
    app.delete("/api/class/delete/:id", (0, roleAuthorization_1.default)(["admin"]), (req, res) => (0, class_controller_1.deleteClass)(req, res));
    //Enroll and unenroll from a class
    app.patch("/api/class/enroll/:id", (0, roleAuthorization_1.default)(["admin", "user"]), (req, res) => (0, class_controller_1.enrollUnenrollClass)(req, res));
    //Rate and comment class
    app.patch("/api/class/rateandcomment/:id", (0, roleAuthorization_1.default)(["admin", "user"]), (req, res) => (0, class_controller_1.rateAndComment)(req, res));
}
exports.default = default_1;
//# sourceMappingURL=class.js.map