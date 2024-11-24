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
        codigoResiduo,
        manifestoItemObservacao,
        dataCriacao,
        dataEnvio,
        codManifesto
    } = req.body;

    const residuo: Residuo = new Residuo(
        quantidade,
        nomeResiduo,
        codigoResiduo,
        codigoAcondicionamento,
        codigoClasse,
        codigoTecnologia,
        codigoTipoEstado,
        codigoUnidade,
        manifestoItemObservacao || null,
        dataCriacao,
        dataEnvio || null,
        codManifesto || null
    );

    const createdResiduo = await this.residuoDAO.createResiduo(residuo);

    return res.status(201).json(createdResiduo);
  }

  public async updateResiduo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (id) {
      const residuoUpdates = req.body;
      await this.residuoDAO.updateResiduo(id, residuoUpdates);
    } else {
      return res.status(400).json({ error: "É necessário informar um id válido" });
    }
       
    return res.status(200).send();
  }

  public async deleteResiduo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    
    if (id) {
      await this.residuoDAO.deleteResiduo(id);
    } else {
      return res.status(400).json({ error: "É necessário informar um id válido" });
    }

    return res.status(200).send();
  }

  public async getAllResiduos(req: Request, res: Response): Promise<Response> {
    const residuos = await this.residuoDAO.getAllResiduos();
    return res.json(residuos);
  }

  public async getResiduosNaoEnviados(req: Request, res: Response): Promise<Response> {
    const residuos = await this.residuoDAO.getAllResiduos();
    const naoEnviados = residuos.filter(residuo => !residuo.dataEnvio);
    return res.json(naoEnviados);
}
}
