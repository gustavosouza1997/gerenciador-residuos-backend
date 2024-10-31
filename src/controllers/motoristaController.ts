import { Request, Response } from "express";
import { MotoristaDAO } from "../dao/motoristaDAO";
import { Motorista } from "../models/Motorista";
import { createId } from "@paralleldrive/cuid2";

export class MotoristaController {
  private motoristaDAO = new MotoristaDAO();

  public async createMotorista(req: Request, res: Response): Promise<Response> {
    const { pessoaId } = req.body;
    const motorista: Motorista = { id: createId(), pessoaId };
    const createdMotorista = await this.motoristaDAO.createMotorista(motorista);
    return res.status(201).json(createdMotorista);
  }

  public async getMotoristaById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Motorista ID is required" });
    }
    const motorista = await this.motoristaDAO.findMotoristaById(id);
    return motorista ? res.json(motorista) : res.status(404).json({ error: "Motorista not found" });
  }

  public async updateMotorista(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Motorista ID is required" });
    }
    const motoristaUpdates = req.body;
    await this.motoristaDAO.updateMotorista(id, motoristaUpdates);
    return res.status(204).send();
  }

  public async deleteMotorista(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Motorista ID is required" });
    }
    await this.motoristaDAO.deleteMotorista(id);
    return res.status(204).send();
  }

  public async getAllMotoristas(req: Request, res: Response): Promise<Response> {
    const motoristas = await this.motoristaDAO.getAllMotoristas();
    return res.json(motoristas);
  }
}
