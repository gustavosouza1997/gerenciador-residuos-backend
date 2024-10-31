import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", async (req, res, next) => {
    try {
        await authController.login(req, res);
    } catch (err) {
        next(err);
    }  
});

authRoutes.post("/logout", async (req, res, next) => {
try {
    await authController.logout(req, res);
} catch (err) {
    next(err);
}  
});

export default authRoutes;
