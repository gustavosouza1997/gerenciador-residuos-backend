"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyDM0urRGcBSNKt5jA5di3HOH38Fh15mY_o",
    authDomain: "gerenciadorderesiduos.firebaseapp.com",
    projectId: "gerenciadorderesiduos",
    storageBucket: "gerenciadorderesiduos.appspot.com",
    messagingSenderId: "400648821597",
    appId: "1:400648821597:web:50d5a38dc4a096d7fd26b4",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
