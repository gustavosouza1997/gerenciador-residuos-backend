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
exports.UserController = void 0;
const userDAO_1 = require("../dao/userDAO");
class UserController {
    constructor() {
        this.userDAO = new userDAO_1.UserDAO();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, cpf, cnpjEmpresa, password } = req.body;
            const user = { name, email, cpf, cnpjEmpresa, password }; // Armazena a senha diretamente
            const createdUser = yield this.userDAO.createUser(user);
            return res.status(201).json(createdUser);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "User ID is required" });
            }
            const user = yield this.userDAO.findUserById(id);
            return user ? res.json(user) : res.status(404).json({ error: "User not found" });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "User ID is required" });
            }
            const userUpdates = req.body;
            yield this.userDAO.updateUser(id, userUpdates);
            return res.status(204).send();
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "User ID is required" });
            }
            yield this.userDAO.deleteUser(id);
            return res.status(204).send();
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userDAO.getAllUsers();
            return res.json(users);
        });
    }
}
exports.UserController = UserController;
