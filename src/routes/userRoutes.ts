import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", async (req, res, next) => {
  try {
	await userController.createUser(req, res);
  } catch (err) {
	next(err);
  }
});

userRoutes.get("/:id", async (req, res, next) => {
  try {
	await userController.getUserById(req, res);
  } catch (err) {
	next(err);
  }
});

userRoutes.put("/:id", async (req, res, next) => {
  try {
	await userController.updateUser(req, res);
  } catch (err) {
	next(err);
  }
});

userRoutes.delete("/:id", async (req, res, next) => {
  try {
	await userController.deleteUser(req, res);
  } catch (err) {
	next(err);
  }
});

userRoutes.get("/", async (req, res, next) => {
  try {
	await userController.getAllUsers(req, res);
  } catch (err) {
	next(err);
  }
});

export default userRoutes;
