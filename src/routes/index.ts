import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import mtrRoutes from "./mtrRoutes";
import pessoaRoutes from "./pessoaRoutes";
import veiculoRoutes from "./veiculoRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/mtr", mtrRoutes);
router.use("/pessoa", pessoaRoutes);
router.use("/users", userRoutes);
router.use("/veiculo", veiculoRoutes);

export default router;
