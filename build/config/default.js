"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    port: 3000,
    host: "localhost",
    dbUrl: `${process.env.DATABASE_URL}`
};
//# sourceMappingURL=default.js.map