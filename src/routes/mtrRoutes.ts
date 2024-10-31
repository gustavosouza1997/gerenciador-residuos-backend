import { Router } from "express";
import { MTRController } from "../controllers/mtrController";

const mtrRoutes = Router();
const mtrController = new MTRController();

mtrRoutes.post("/", async (req, res, next) => {
  try {
	await mtrController.enviarManifesto(req, res);
  } catch (err) {
	next(err);
  }
});

mtrRoutes.get("/acondicionamento", async (req, res, next) => {
  try {
    await mtrController.getListaAcondicionamento(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.get("/classe", async (req, res, next) => {
  try {
    await mtrController.getListaClasse(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.get("/estadoFisico", async (req, res, next) => {
  try {
    await mtrController.getListaEstadoFisico(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.get("/residuo", async (req, res, next) => {
  try {
    await mtrController.getListaResiduo(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.get("/tecnologia", async (req, res, next) => {
  try {
    await mtrController.getListaTecnologia(req, res);
  } catch (err) {
    next(err);
  }
});

mtrRoutes.get("/unidade", async (req, res, next) => {
  try {
    await mtrController.getListaUnidade(req, res);
  } catch (err) {
    next(err);
  }
});

export default mtrRoutes;