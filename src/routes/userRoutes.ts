import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/userController";
import { authenticate } from '../middleware/authenticate';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
	await userController.createUser(req, res);
  } catch (err) {
	next(err);
  }
});

userRoutes.get("/:id", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
	await userController.getUserById(req, res);
  } catch (err) {
	next(err);
  }
});

userRoutes.put("/:id", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
	await userController.updateUser(req, res);
  } catch (err) {
	next(err);
  }
});

userRoutes.delete("/:id", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
	await userController.deleteUser(req, res);
  } catch (err) {
	next(err);
  }
});

userRoutes.get("/", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
	await userController.getAllUsers(req, res);
  } catch (err) {
	next(err);
  }
});

export default userRoutes;
