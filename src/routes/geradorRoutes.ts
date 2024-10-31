import { Router } from "express";
import { GeradorController } from "../controllers/geradorController";

const geradorRoutes = Router();
const geradorController = new GeradorController();

geradorRoutes.post("/", async (req, res, next) => {
    try {
        await geradorController.createGerador(req, res);
    } catch (err) {
        next(err);
    }  
});

geradorRoutes.get("/", async (req, res, next) => {
    try {
        await geradorController.getGeradorById(req, res);
    } catch (err) {
        next(err);
    }  
});

geradorRoutes.put("/:id", async (req, res, next) => {
    try {
        await geradorController.updateGerador(req, res);
    } catch (err) {
        next(err);
    }  
});

geradorRoutes.delete("/:id", async (req, res, next) => {
    try {
        await geradorController.updateGerador(req, res);
    } catch (err) {
        next(err);
    }  
});

geradorRoutes.get("/", async (req, res, next) => {
    try {
        await geradorController.getAllGeradores(req, res);
    } catch (err) {
        next(err);
    }  
});

export default geradorRoutes;
