import { Router, Request, Response, NextFunction } from "express";
import { IBGEController } from "../controllers/IBGEController";
import { authenticate } from '../middleware/authenticate';

const ibgeRoutes = Router();
const ibgeController = new IBGEController();

ibgeRoutes.get("/", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
	await ibgeController.getUFs(req, res);
  } catch (err) {
	next(err);
  }
});

ibgeRoutes.get("/:uf", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await ibgeController.getCities(req, res);
  } catch (err) {
    next(err);
  }
});

export default ibgeRoutes;