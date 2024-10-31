"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllerFactory = void 0;
const userController_1 = require("../controllers/userController");
const userControllerFactory = () => new userController_1.UserController();
exports.userControllerFactory = userControllerFactory;
