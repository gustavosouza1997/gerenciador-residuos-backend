import { Request, Response } from "express";
import { DestinadorDAO } from "../dao/destinadorDAO";
import { Destinador } from "../models/Destinador";
import { createId } from "@paralleldrive/cuid2";

export class DestinadorController {
  private destinadorDAO = new DestinadorDAO();

  public async createDestinador(req: Request, res: Response): Promise<Response> {
    const { pessoaId } = req.body;
    const Destinador: Destinador = { id: createId(), pessoaId };
    const createdDestinador = await this.destinadorDAO.createDestinador(Destinador);
    return res.status(201).json(createdDestinador);
  }

  public async getDestinadorById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID do Destinador é obrigatório" });
    }
    const destinador = await this.destinadorDAO.findDestinadorById(id);
    return destinador ? res.json(destinador) : res.status(404).json({ error: "Destinador não encontrado" });
  }

  public async updateDestinador(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID do Destinador é obrigatório" });
    }
    const DestinadorUpdates = req.body;
    await this.destinadorDAO.updateDestinador(id, DestinadorUpdates);
    return res.status(204).send();
  }

  public async deleteDestinador(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID do Destinador é obrigatório" });
    }
    await this.destinadorDAO.deleteDestinador(id);
    return res.status(204).send();
  }

  public async getAllDestinadores(req: Request, res: Response): Promise<Response> {
    const Destinadors = await this.destinadorDAO.getAllDestinadores();
    return res.json(Destinadors);
  }
}
