import { Router } from "express";
import { DestinadorController } from "../controllers/destinadorController";

const destinadorRoutes = Router();
const destinadorController = new DestinadorController();

destinadorRoutes.post("/", async (req, res, next) => {
    try {
        await destinadorController.createDestinador(req, res);
    } catch (err) {
        next(err);
    }  
});

destinadorRoutes.get("/", async (req, res, next) => {
    try {
        await destinadorController.getDestinadorById(req, res);
    } catch (err) {
        next(err);
    }  
});

destinadorRoutes.put("/:id", async (req, res, next) => {
    try {
        await destinadorController.updateDestinador(req, res);
    } catch (err) {
        next(err);
    }  
});

destinadorRoutes.delete("/:id", async (req, res, next) => {
    try {
        await destinadorController.updateDestinador(req, res);
    } catch (err) {
        next(err);
    }  
});

destinadorRoutes.get("/", async (req, res, next) => {
    try {
        await destinadorController.getAllDestinadores(req, res);
    } catch (err) {
        next(err);
    }  
});

export default destinadorRoutes;
