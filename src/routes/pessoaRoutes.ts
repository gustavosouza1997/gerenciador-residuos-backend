import { Router, Request, Response, NextFunction } from "express";
import { PessoaController } from "../controllers/pessoaController";
import { authenticate } from '../middleware/authenticate';

const pessoaRoutes = Router();
const pessoaController = new PessoaController();

pessoaRoutes.post("/", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await pessoaController.createPessoa(req, res);
    } catch (err) {
        next(err);
    }  
});

pessoaRoutes.put("/:id", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await pessoaController.updatePessoa(req, res);
    } catch (err) {
        next(err);
    }  
});

pessoaRoutes.delete("/:id", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await pessoaController.deletePessoa(req, res);
    } catch (err) {
        next(err);
    }  
});

pessoaRoutes.get("/listar", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await pessoaController.getAllPessoas(req, res);
    } catch (err) {
        next(err);
    }  
});

export default pessoaRoutes;
