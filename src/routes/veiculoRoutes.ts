import { Router } from "express";
import { VeiculoController } from "../controllers/veiculoController";

const veiculosRoutes = Router();
const veiculoController = new VeiculoController();

veiculosRoutes.post("/", async (req, res, next) => {
    try {
        await veiculoController.createVeiculo(req, res);
    } catch (err) {
        next(err);
    }  
});

veiculosRoutes.get("/", async (req, res, next) => {
    try {
        await veiculoController.getVeiculoById(req, res);
    } catch (err) {
        next(err);
    }  
});

veiculosRoutes.put("/:id", async (req, res, next) => {
    try {
        await veiculoController.updateVeiculo(req, res);
    } catch (err) {
        next(err);
    }  
});

veiculosRoutes.delete("/:id", async (req, res, next) => {
    try {
        await veiculoController.deleteVeiculo(req, res);
    } catch (err) {
        next(err);
    }  
});

veiculosRoutes.get("/", async (req, res, next) => {
    try {
        await veiculoController.getAllVeiculos(req, res);
    } catch (err) {
        next(err);
    }  
});

export default veiculosRoutes;
