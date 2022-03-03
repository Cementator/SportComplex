"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express_1 = __importDefault(require("express"));
const default_1 = __importDefault(require("../config/default"));
const connect_1 = __importDefault(require("./db/connect"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const port = default_1.default.port;
const host = default_1.default.host;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
    (0, connect_1.default)();
    (0, auth_1.default)(app);
});
//# sourceMappingURL=app.js.map