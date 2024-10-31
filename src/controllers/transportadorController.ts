import { Request, Response } from "express";
import { TransportadorDAO } from "../dao/transportadorDAO";
import { Transportador } from "../models/Transportador";
import { createId } from "@paralleldrive/cuid2";

export class TransportadorController {
  private transportadorDAO = new TransportadorDAO();

  public async createTransportador(req: Request, res: Response): Promise<Response> {
    const { pessoaId } = req.body;
    const transportador: Transportador = { id: createId(), pessoaId };
    const createdTransportador = await this.transportadorDAO.createTransportador(transportador);
    return res.status(201).json(createdTransportador);
  }

  public async getTransportadorById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Transportador ID is required" });
    }
    const transportador = await this.transportadorDAO.findTransportadorById(id);
    return transportador ? res.json(transportador) : res.status(404).json({ error: "Transportador not found" });
  }

  public async updateTransportador(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Transportador ID is required" });
    }
    const transportadorUpdates = req.body;
    await this.transportadorDAO.updateTransportador(id, transportadorUpdates);
    return res.status(204).send();
  }

  public async deleteTransportador(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Transportador ID is required" });
    }
    await this.transportadorDAO.deleteTransportador(id);
    return res.status(204).send();
  }

  public async getAllTransportadores(req: Request, res: Response): Promise<Response> {
    const transportadores = await this.transportadorDAO.getAllTransportadores();
    return res.json(transportadores);
  }
}
