import { Router, Request, Response, NextFunction } from "express";
import { MTRController } from "../controllers/mtrController";
import { authenticate } from '../middleware/authenticate';

const mtrRoutes = Router();
const mtrController = new MTRController();

mtrRoutes.post("/", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
	await mtrController.enviarManifesto(req, res);
  } catch (err) {
	next(err);
  }
});

mtrRoutes.post("/acondicionamento", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await mtrController.getListaAcondicionamento(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.post("/classe", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await mtrController.getListaClasse(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.post("/estadoFisico", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await mtrController.getListaEstadoFisico(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.post("/residuo", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await mtrController.getListaResiduo(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.post("/tecnologia", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await mtrController.getListaTecnologia(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.post("/unidade", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await mtrController.getListaUnidade(req, res);
  } catch (err) {
    next(err);
  }
});

export default mtrRoutes;