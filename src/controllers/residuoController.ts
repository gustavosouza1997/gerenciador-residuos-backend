import { Request, Response } from "express";
import { ResiduoDAO } from "../dao/residuoDAO";
import { Residuo } from "../models/Residuo";

export class ResiduoController {
  private residuoDAO = new ResiduoDAO();

  public async createResiduo(req: Request, res: Response): Promise<Response> {
    const {
        quantidade,
        nomeResiduo,
        codigoAcondicionamento,
        codigoClasse,
        codigoTecnologia,
        codigoTipoEstado,
        codigoUnidade,
        manifestoItemObservacao,
        dataCriação,
        dataEnvio,
        codManifesto
    } = req.body;

    const residuo: Residuo = new Residuo(
        quantidade,
        nomeResiduo,
        codigoAcondicionamento,
        codigoClasse,
        codigoTecnologia,
        codigoTipoEstado,
        codigoUnidade,
        manifestoItemObservacao || null,
        dataCriação,
        dataEnvio || null,
        codManifesto || null
    );

    const createdResiduo = await this.residuoDAO.createResiduo(residuo);

    return res.status(201).json(createdResiduo);
  }

  public async getResiduoByField(req: Request, res: Response): Promise<Response> {
    const { field, value } = req.body;

    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }

    const residuo = await this.residuoDAO.findResiduoByField(field, value);
    return Residuo ? res.json(residuo) : res.status(404).json({ error: "Residuo não encontrado" });
  }

  public async updateResiduo(req: Request, res: Response): Promise<Response> {
    const { field, value } = req.body;

    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }
    
    const residuoUpdates = req.body;
    await this.residuoDAO.updateResiduo(field, value, residuoUpdates);
    return res.status(204).send();
  }

  public async deleteResiduo(req: Request, res: Response): Promise<Response> {
    const { field, value } = req.body;

    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }

    await this.residuoDAO.deleteResiduo(field, value);
    return res.status(204).send();
  }

  public async getAllResiduos(req: Request, res: Response): Promise<Response> {
    const residuos = await this.residuoDAO.getAllResiduos();
    return res.json(residuos);
  }
}