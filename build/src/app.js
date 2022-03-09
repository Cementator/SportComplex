"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const default_1 = __importDefault(require("../config/default"));
const connect_1 = __importDefault(require("./db/connect"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const class_1 = __importDefault(require("./routes/class"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const port = default_1.default.port;
const host = default_1.default.host;
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, './views'));
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//establish server and connect ot the database
app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
    (0, connect_1.default)();
    // authorization routes
    (0, auth_1.default)(app);
    // user routes
    (0, user_1.default)(app);
    // class routes "Class uppercase is on purpose"
    (0, class_1.default)(app);
});
//# sourceMappingURL=app.js.map