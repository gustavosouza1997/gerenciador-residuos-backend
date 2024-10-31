import { Request, Response } from "express";
import { GeradorDAO } from "../dao/geradorDAO";
import { Gerador } from "../models/Gerador";
import { createId } from "@paralleldrive/cuid2";

export class GeradorController {
  private geradorDAO = new GeradorDAO();

  public async createGerador(req: Request, res: Response): Promise<Response> {
    const { pessoaId } = req.body;
    const gerador: Gerador = { id: createId(), pessoaId };
    const createdGerador = await this.geradorDAO.createGerador(gerador);
    return res.status(201).json(createdGerador);
  }

  public async getGeradorById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Gerador ID is required" });
    }
    const gerador = await this.geradorDAO.findGeradorById(id);
    return gerador ? res.json(gerador) : res.status(404).json({ error: "Gerador not found" });
  }

  public async updateGerador(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Gerador ID is required" });
    }
    const geradorUpdates = req.body;
    await this.geradorDAO.updateGerador(id, geradorUpdates);
    return res.status(204).send();
  }

  public async deleteGerador(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Gerador ID is required" });
    }
    await this.geradorDAO.deleteGerador(id);
    return res.status(204).send();
  }

  public async getAllGeradores(req: Request, res: Response): Promise<Response> {
    const geradors = await this.geradorDAO.getAllGeradores();
    return res.json(geradors);
  }
}
