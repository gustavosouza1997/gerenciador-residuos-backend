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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDAO = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const firestore_1 = require("firebase/firestore");
// Referência para a coleção de usuários
const usersCollection = (0, firestore_1.collection)(firebaseConfig_1.db, "users");
class UserDAO {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRef = yield (0, firestore_1.addDoc)(usersCollection, user);
            const { id } = user, userWithoutId = __rest(user, ["id"]);
            return Object.assign({ id: userRef.id }, userWithoutId);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoc = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(usersCollection, id));
            return userDoc.exists() ? Object.assign({ id: userDoc.id }, userDoc.data()) : null;
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRef = (0, firestore_1.doc)(usersCollection, id);
            yield (0, firestore_1.updateDoc)(userRef, user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(usersCollection, id));
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const querySnapshot = yield (0, firestore_1.getDocs)(usersCollection);
            return querySnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        });
    }
}
exports.UserDAO = UserDAO;
