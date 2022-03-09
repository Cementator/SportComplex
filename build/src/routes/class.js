"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_controller_1 = require("../controllers/class.controller");
function default_1(app) {
    // Create Class
    app.post("/api/class/create", (req, res) => (0, class_controller_1.createClass)(req, res));
    //Get single class
    app.get("/api/class/single/:id", (req, res) => (0, class_controller_1.getSingleClass)(req, res));
    // Get list of classes
    app.get("/api/class/all", (req, res) => (0, class_controller_1.getAllClasses)(req, res));
    //Edit class
    app.patch("/api/class/edit/:id", (req, res) => (0, class_controller_1.editClass)(req, res));
    //Delete class
    app.delete("/api/class/delete/:id", (req, res) => (0, class_controller_1.deleteClass)(req, res));
}
exports.default = default_1;
//# sourceMappingURL=class.js.map