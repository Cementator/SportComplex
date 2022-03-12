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
exports.rateAndComment = exports.enrollUnenrollClass = exports.deleteClass = exports.editClass = exports.getAllClasses = exports.getSingleClass = exports.createClass = void 0;
const sportClass_1 = __importDefault(require("../models/sportClass"));
const user_1 = __importDefault(require("../models/user"));
const moment_1 = __importDefault(require("moment"));
const decodeToken_1 = __importDefault(require("../services/decodeToken"));
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
            if (now.isBefore(timeOfTermin) === false) {
                return res.status(400).json({ message: "You have entered termin date in the past. " });
            }
            const existingTermin = yield sportClass_1.default.findOne({ sport: req.body.sport, weekSchedule: req.body.weekSchedule, age: req.body.age });
            if (existingTermin !== null) {
                return res.status(400).json({ message: "Termin for given sport already exists." });
            }
            //saving new sports termin to the database
            let newTermin = yield termin.save();
            //time returned here is UTC time as all times saved in mongo DB are UTC
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
        const userData = (0, decodeToken_1.default)((req.headers.authorization).replace('Bearer ', ''));
        try {
            let singleTermin = {};
            if (userData.role === "admin") {
                singleTermin = yield sportClass_1.default.findOne({ _id: req.params.id });
            }
            else if (userData.role === "user") {
                singleTermin = yield sportClass_1.default.findOne({ _id: req.params.id }).select(['-averageRating', '-comments', '-ratings']);
            }
            res.status(200).json(singleTermin);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.getSingleClass = getSingleClass;
function getAllClasses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // filter object setup for mongoose find function
        let sport = undefined;
        let age = undefined;
        let filterObject = {};
        if (req.query.sport) {
            sport = req.query.sport.split(',');
            // @ts-ignore
            filterObject['sport'] = sport;
        }
        if (req.query.age) {
            age = req.query.age.split(',');
            // @ts-ignore
            filterObject['age'] = age;
        }
        try {
            let listOfClasses = yield sportClass_1.default.find(filterObject).select(['-averageRating', '-comments', '-ratings']);
            const page = req.query.page;
            const limit = req.query.limit;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const totalPages = Math.ceil(listOfClasses.length / limit);
            const pagedClasses = listOfClasses.slice(startIndex, endIndex);
            if (pagedClasses.length === 0) {
                res.status(200).json(listOfClasses);
            }
            else {
                res.status(200).json([{ pagedClasses }, { totalPages: totalPages }]);
            }
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.getAllClasses = getAllClasses;
function editClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            let updatedTermin = yield sportClass_1.default.updateOne({ _id: req.params.id }, { $set: data }, { runValidators: true });
            res.status(200).json(updatedTermin);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.editClass = editClass;
function deleteClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if ((req.params.id).match(/^[0-9a-fA-F]{24}$/)) {
                const termin = yield sportClass_1.default.findOne({ _id: req.params.id });
                if (termin === null) {
                    res.status(404).json({ message: "Termin with this id does not exist." });
                }
                else {
                    yield sportClass_1.default.deleteOne({ _id: req.params.id });
                    res.status(200).json({ message: "Termin deleted successfully." });
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
exports.deleteClass = deleteClass;
function enrollUnenrollClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = (0, decodeToken_1.default)((req.headers.authorization).replace('Bearer ', ''));
        let singleTermin = {};
        try {
            singleTermin = yield sportClass_1.default.findOne({ _id: req.params.id });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
            return;
        }
        if (userData.age !== singleTermin.age) {
            res.status(400).json({ message: "User is not in the same age group as the class." });
            return;
        }
        try {
            // if user is already enrolled - unenroll him (checking his id)
            if (singleTermin.players.includes(userData.id)) {
                yield sportClass_1.default.updateOne({ _id: req.params.id }, { $pull: { players: userData.id } });
                yield user_1.default.updateOne({ _id: userData.id }, { $pull: { enrolled: singleTermin._id } });
                res.status(200).json({ message: "User unenrolled." });
            }
            // if there is no user id inside players array enroll him in this class
            else if (!singleTermin.players.includes(userData.id)) {
                if (singleTermin.players.length >= 10) {
                    res.status(400).json({ message: "Termin is full." });
                }
                else if (userData.enrolled.length >= 2) {
                    res.status(400).json({ message: "User is already enrolled on 2 classes." });
                }
                else {
                    yield sportClass_1.default.updateOne({ _id: req.params.id }, { $push: { players: userData.id } });
                    yield user_1.default.updateOne({ _id: userData.id }, { $push: { enrolled: singleTermin._id } });
                    res.status(200).json({ message: "User enrolled in class." });
                }
            }
            else {
                res.status(400).json({ message: "Wrong termin id." });
                return;
            }
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.enrollUnenrollClass = enrollUnenrollClass;
function rateAndComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // getting all data required for calculations and update
        const userData = (0, decodeToken_1.default)((req.headers.authorization).replace('Bearer ', ''));
        let singleTermin = {};
        try {
            singleTermin = yield sportClass_1.default.findOne({ _id: req.params.id });
        }
        catch (e) {
            res.status(400).json({ message: e.message });
            return;
        }
        const comment = req.body.comment;
        const rating = req.body.rating;
        let averageRating = singleTermin.averageRating;
        let arrayOfRatings = [];
        // declare object in which we declare updates
        let objectForUpdate = {};
        // check if user has already rated this termin
        const alreadyRated = singleTermin.ratings.some((element) => {
            return element.byUser === userData.id;
        });
        // check if rating and comment exist and add them to the update object
        if (alreadyRated === false && rating) {
            if (rating > 5 || rating < 1) {
                res.status(400).json({ message: "Rating value must be between 1 and 5." });
                return;
            }
            objectForUpdate['ratings'] = {
                rating: rating,
                byUser: userData.id
            };
            // calculating average rating only when new rating is added otherwise it stays the same
            singleTermin.ratings.forEach((element) => {
                arrayOfRatings.push(element.rating);
            });
            // push new rating
            arrayOfRatings.push(rating);
            //calculating average rating from array of ratings
            averageRating = (arrayOfRatings.reduce((previousValue, currentValue) => previousValue + currentValue, 0)) / arrayOfRatings.length;
        }
        if (comment) {
            objectForUpdate['comments'] = {
                text: comment
            };
        }
        // check if there is anything to update
        const numberOfUpdates = Object.keys(objectForUpdate).length;
        try {
            // Push object for update if there is any and set averageRating
            if (numberOfUpdates !== 0) {
                yield sportClass_1.default.updateOne({ _id: req.params.id }, { $push: objectForUpdate, $set: { averageRating: averageRating } });
                res.status(200).json({ message: "Comment and rating saved successfully." });
            }
            else {
                res.status(400).json({ message: "Nothing to update" });
            }
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    });
}
exports.rateAndComment = rateAndComment;
//# sourceMappingURL=class.controller.js.map