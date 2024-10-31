import { Router } from "express";
import { PessoaController } from "../controllers/pessoaController";

const pessoaRoutes = Router();
const pessoaController = new PessoaController();

pessoaRoutes.post("/", async (req, res, next) => {
    try {
        await pessoaController.createPessoa(req, res);
    } catch (err) {
        next(err);
    }  
});

pessoaRoutes.get("/:value", async (req, res, next) => {
    try {
        await pessoaController.getPessoaByField(req, res);
    } catch (err) {
        next(err);
    }  
});

pessoaRoutes.put("/:value", async (req, res, next) => {
    console.log("UpdatePessoa " + req.params.value);
    
    try {
        await pessoaController.updatePessoa(req, res);
    } catch (err) {
        next(err);
    }  
});

pessoaRoutes.delete("/:value", async (req, res, next) => {
    try {
        await pessoaController.deletePessoa(req, res);
    } catch (err) {
        next(err);
    }  
});

pessoaRoutes.get("/", async (req, res, next) => {
    try {
        await pessoaController.getAllPessoas(req, res);
    } catch (err) {
        next(err);
    }  
});

export default pessoaRoutes;
