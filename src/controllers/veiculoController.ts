import { Request, Response } from "express";
import { VeiculoDAO } from "../dao/veiculoDAO";
import { Veiculo } from "../models/Veiculo";
import { createId } from "@paralleldrive/cuid2";

export class VeiculoController {
  private veiculoDAO = new VeiculoDAO();

  public async createVeiculo(req: Request, res: Response): Promise<Response> {
    const { placa, marca, modelo } = req.body;
    const veiculo: Veiculo = { id: createId(), placa, marca, modelo };
    const createdVeiculo = await this.veiculoDAO.createVeiculo(veiculo);
    return res.status(201).json(createdVeiculo);
  }

  public async getVeiculoById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Veiculo ID is required" });
    }
    const veiculo = await this.veiculoDAO.findVeiculoById(id);
    return veiculo ? res.json(veiculo) : res.status(404).json({ error: "Veiculo not found" });
  }

  public async updateVeiculo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Veiculo ID is required" });
    }
    const veiculoUpdates = req.body;
    await this.veiculoDAO.updateVeiculo(id, veiculoUpdates);
    return res.status(204).send();
  }

  public async deleteVeiculo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Veiculo ID is required" });
    }
    await this.veiculoDAO.deleteVeiculo(id);
    return res.status(204).send();
  }

  public async getAllVeiculos(req: Request, res: Response): Promise<Response> {
    const veiculos = await this.veiculoDAO.getAllVeiculos();
    return res.json(veiculos);
  }
}
