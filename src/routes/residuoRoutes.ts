import { Router, Request, Response, NextFunction } from "express";
import { ResiduoController } from "../controllers/residuoController";
import { authenticate } from '../middleware/authenticate';

const residuoRoutes = Router();
const residuoController = new ResiduoController();

residuoRoutes.post("/", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await residuoController.createResiduo(req, res);
    } catch (err) {
        next(err);
    }  
});

residuoRoutes.get("/", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await residuoController.getResiduoByField(req, res);
    } catch (err) {
        next(err);
    }  
});

residuoRoutes.put("/:value", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await residuoController.updateResiduo(req, res);
    } catch (err) {
        next(err);
    }  
});

residuoRoutes.delete("/:id", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await residuoController.deleteResiduo(req, res);
    } catch (err) {
        next(err);
    }  
});

residuoRoutes.get("/listar", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await residuoController.getAllResiduos(req, res);
    } catch (err) {
        next(err);
    }  
});

residuoRoutes.get("/nao-enviados", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await residuoController.getResiduosNaoEnviados(req, res);
    } catch (err) {
        next(err);
    }
});

export default residuoRoutes;