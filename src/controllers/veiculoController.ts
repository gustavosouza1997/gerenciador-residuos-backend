import { Request, Response } from "express";
import { VeiculoDAO } from "../dao/veiculoDAO";
import { Veiculo } from "../models/Veiculo";

export class VeiculoController {
  private veiculoDAO = new VeiculoDAO();

  public async createVeiculo(req: Request, res: Response): Promise<Response> {
    const { placa, marca, modelo } = req.body;
    const veiculo: Veiculo = new Veiculo(placa, marca, modelo);

    const createdVeiculo = await this.veiculoDAO.createVeiculo(veiculo);

    return res.status(201).json(createdVeiculo);
  }

  public async updateVeiculo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (id) {
      const veiculoUpdates = req.body;
      await this.veiculoDAO.updateVeiculo(id, veiculoUpdates);
    } else {
      return res.status(400).json({ error: "É necessário informar um id válido" });
    }
       
    return res.status(200).send();
  }

  public async deleteVeiculo(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    
    if (id) {
      await this.veiculoDAO.deleteVeiculo(id);
    } else {
      return res.status(400).json({ error: "É necessário informar um id válido" });
    }
    
    return res.status(200).send();
  }

  public async getAllVeiculos(req: Request, res: Response): Promise<Response> {
    const veiculos = await this.veiculoDAO.getAllVeiculos();
    return res.json(veiculos);
  }
}
