import { Router } from "express";
import authRoutes from "./authRoutes";
import mtrRoutes from "./mtrRoutes";
import pessoaRoutes from "./pessoaRoutes";
import veiculoRoutes from "./veiculoRoutes";
import residuoRoutes from "./residuoRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/mtr", mtrRoutes);
router.use("/pessoa", pessoaRoutes);
router.use("/veiculo", veiculoRoutes);
router.use("/residuo", residuoRoutes);

export default router;
