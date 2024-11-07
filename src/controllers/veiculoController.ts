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

  public async getVeiculoByField(req: Request, res: Response): Promise<Response> {
    const { field, value } = req.body;

    console.log("getPessoa "+ field, value);    

    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }

    const veiculo = await this.veiculoDAO.findVeiculoByField(field, value);
    return veiculo ? res.json(veiculo) : res.status(404).json({ error: "Veiculo not found" });
  }

  public async updateVeiculo(req: Request, res: Response): Promise<Response> {
    const { field, value } = req.body;

    console.log("getPessoa "+ field, value);    

    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }
    
    const veiculoUpdates = req.body;
    await this.veiculoDAO.updateVeiculo(field, value, veiculoUpdates);
    return res.status(204).send();
  }

  public async deleteVeiculo(req: Request, res: Response): Promise<Response> {
    const { field, value } = req.body;

    console.log("getPessoa "+ field, value);    

    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }

    await this.veiculoDAO.deleteVeiculo(field, value);
    return res.status(204).send();
  }

  public async getAllVeiculos(req: Request, res: Response): Promise<Response> {
    const veiculos = await this.veiculoDAO.getAllVeiculos();
    return res.json(veiculos);
  }
}
