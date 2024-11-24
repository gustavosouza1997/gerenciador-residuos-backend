import { Router, Request, Response, NextFunction } from "express";
import { VeiculoController } from "../controllers/veiculoController";
import { authenticate } from '../middleware/authenticate';

const veiculosRoutes = Router();
const veiculoController = new VeiculoController();

veiculosRoutes.post("/", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await veiculoController.createVeiculo(req, res);
    } catch (err) {
        next(err);
    }  
});


veiculosRoutes.put("/:id", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await veiculoController.updateVeiculo(req, res);
    } catch (err) {
        next(err);
    }  
});

veiculosRoutes.delete("/:id", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await veiculoController.deleteVeiculo(req, res);
    } catch (err) {
        next(err);
    }  
});

veiculosRoutes.get("/listar", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await veiculoController.getAllVeiculos(req, res);
    } catch (err) {
        next(err);
    }  
});

export default veiculosRoutes;
