"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.getAllUsers = exports.getSingleUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const lodash_1 = require("lodash");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.default({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
            role: req.body.role,
            isVerified: true
        });
        try {
            //hash user password
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            user.password = hashedPassword;
            //saving new user to database
            let newUser = yield user.save();
            newUser = newUser.toObject();
            res.status(201).json((0, lodash_1.omit)(newUser, ['password']));
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.createUser = createUser;
function getSingleUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let currentUser = yield user_1.default.findOne({ _id: req.params.id });
            res.status(200).json(currentUser);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.getSingleUser = getSingleUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let listOfUsers = yield user_1.default.find();
            const page = req.query.page;
            const limit = req.query.limit;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const pagedUsers = listOfUsers.slice(startIndex, endIndex);
            const totalPages = Math.ceil(listOfUsers.length / limit);
            if (pagedUsers.length === 0) {
                res.status(200).json(listOfUsers);
            }
            else {
                res.status(200).json([{ pagedUsers }, { totalPages: totalPages }]);
            }
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.getAllUsers = getAllUsers;
function editUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            if (data.password) {
                //hash user password
                const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
                data.password = hashedPassword;
            }
            let currentUser = yield user_1.default.updateOne({ _id: req.params.id }, { $set: data }, { runValidators: true });
            res.status(200).json(currentUser);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.editUser = editUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((req.params.id).match(/^[0-9a-fA-F]{24}$/)) {
                const user = yield user_1.default.findOne({ _id: req.params.id });
                if (user === null) {
                    res.status(404).json({ message: "User with this id does not exist." });
                }
                else {
                    yield user_1.default.deleteOne({ _id: req.params.id });
                    res.status(200).json({ message: "User deleted successfully." });
                }
            }
            else {
                res.status(400).json({ message: "Wrong id format." });
            }
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map