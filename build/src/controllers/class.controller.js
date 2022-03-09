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
exports.deleteClass = exports.editClass = exports.getAllClasses = exports.getSingleClass = exports.createClass = void 0;
const sportClass_1 = __importDefault(require("../models/sportClass"));
const moment_1 = __importDefault(require("moment"));
function createClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const termin = new sportClass_1.default({
            sport: req.body.sport,
            age: req.body.age,
            weekSchedule: req.body.weekSchedule,
            duration: req.body.duration,
            description: req.body.description,
            players: req.body.players,
        });
        try {
            const now = (0, moment_1.default)();
            const timeOfTermin = (0, moment_1.default)(req.body.weekSchedule);
            const timeGG = (0, moment_1.default)("2022-03-13 18:00:00").format("x");
            console.log(timeOfTermin);
            console.log(timeGG);
            if (now.isBefore(timeOfTermin) === false) {
                return res.status(400).json({ message: "You have entered termin date in the past. " });
            }
            const existingTermin = yield sportClass_1.default.findOne({ sport: req.body.sport, weekSchedule: req.body.weekSchedule, age: req.body.age });
            if (existingTermin !== null) {
                return res.status(400).json({ message: "Termin for given sport already exists." });
            }
            //saving new sports termin to the database
            let newTermin = yield termin.save();
            res.status(201).json(newTermin);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.createClass = createClass;
function getSingleClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.getSingleClass = getSingleClass;
function getAllClasses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.getAllClasses = getAllClasses;
function editClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.editClass = editClass;
function deleteClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.deleteClass = deleteClass;
//# sourceMappingURL=class.controller.js.map