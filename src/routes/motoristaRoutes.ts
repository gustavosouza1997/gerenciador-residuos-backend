import { Router } from "express";
import { MotoristaController } from "../controllers/motoristaController";

const motoristaRoutes = Router();
const motoristaController = new MotoristaController();

motoristaRoutes.post("/", async (req, res, next) => {
    try {
        await motoristaController.createMotorista(req, res);
    } catch (err) {
        next(err);
    }  
});

motoristaRoutes.get("/", async (req, res, next) => {
    try {
        await motoristaController.getMotoristaById(req, res);
    } catch (err) {
        next(err);
    }  
});

motoristaRoutes.put("/:id", async (req, res, next) => {
    try {
        await motoristaController.updateMotorista(req, res);
    } catch (err) {
        next(err);
    }  
});

motoristaRoutes.delete("/:id", async (req, res, next) => {
    try {
        await motoristaController.updateMotorista(req, res);
    } catch (err) {
        next(err);
    }  
});

motoristaRoutes.get("/", async (req, res, next) => {
    try {
        await motoristaController.getAllMotoristas(req, res);
    } catch (err) {
        next(err);
    }  
});

export default motoristaRoutes;
