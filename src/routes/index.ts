import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import destinadorRoutes from "./destinadorRoutes";
import geradorRoutes from "./geradorRoutes";
import motoristaRoutes from "./motoristaRoutes";
import mtrRoutes from "./mtrRoutes";
import pessoaRoutes from "./pessoaRoutes";
import transportadorRoutes from "./transportadorRoutes";
import veiculoRoutes from "./veiculoRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/destinador", destinadorRoutes);
router.use("/gerador", geradorRoutes);
router.use("/motorista", motoristaRoutes);
router.use("/mtr", mtrRoutes);
router.use("/pessoa", pessoaRoutes);
router.use("/transportador", transportadorRoutes);
router.use("/users", userRoutes);
router.use("/veiculo", veiculoRoutes);

export default router;
