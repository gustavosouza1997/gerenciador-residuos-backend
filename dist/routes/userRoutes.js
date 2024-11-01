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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRoutes = (0, express_1.Router)();
const userController = new userController_1.UserController();
userRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.createUser(req, res);
    }
    catch (err) {
        next(err);
    }
}));
userRoutes.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.getUserById(req, res);
    }
    catch (err) {
        next(err);
    }
}));
userRoutes.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.updateUser(req, res);
    }
    catch (err) {
        next(err);
    }
}));
userRoutes.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.deleteUser(req, res);
    }
    catch (err) {
        next(err);
    }
}));
userRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userController.getAllUsers(req, res);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = userRoutes;
