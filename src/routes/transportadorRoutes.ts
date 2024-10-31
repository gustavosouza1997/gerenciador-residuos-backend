import { Router } from "express";
import { TransportadorController } from "../controllers/transportadorController";

const transportadorRoutes = Router();
const transportadorController = new TransportadorController();

transportadorRoutes.post("/", async (req, res, next) => {
    try {
        await transportadorController.createTransportador(req, res);
    } catch (err) {
        next(err);
    }  
});

transportadorRoutes.get("/", async (req, res, next) => {
    try {
        await transportadorController.getTransportadorById(req, res);
    } catch (err) {
        next(err);
    }  
});

transportadorRoutes.put("/:id", async (req, res, next) => {
    try {
        await transportadorController.updateTransportador(req, res);
    } catch (err) {
        next(err);
    }  
});

transportadorRoutes.delete("/:id", async (req, res, next) => {
    try {
        await transportadorController.deleteTransportador(req, res);
    } catch (err) {
        next(err);
    }  
});

transportadorRoutes.get("/", async (req, res, next) => {
    try {
        await transportadorController.getAllTransportadores(req, res);
    } catch (err) {
        next(err);
    }  
});

export default transportadorRoutes;
