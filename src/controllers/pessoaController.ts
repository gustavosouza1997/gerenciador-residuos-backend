import { Request, Response } from "express";
import { PessoaDAO } from "../dao/pessoaDAO";
import { PessoaFisica } from "../models/PessoaFisica";
import { PessoaJuridica } from "../models/PessoaJuridica";

export class PessoaController {
  private pessoaDAO = new PessoaDAO();

  public async createPessoa(req: Request, res: Response): Promise<Response> {
    const { endereco, telefone, email, nome, cpf, razaoSocial, cnpj, transportador, destinador, gerador, motorista } = req.body;

    let createdPessoa;

    if (cpf && !cnpj) {
      const pessoa: PessoaFisica = new PessoaFisica(nome, cpf, endereco, telefone, email, transportador, gerador, destinador, motorista);
      createdPessoa = await this.pessoaDAO.createPessoa(pessoa);
    } else if (cnpj && !cpf) {
      const pessoa: PessoaJuridica = new PessoaJuridica(razaoSocial, cnpj, endereco, telefone, email, transportador, gerador, destinador);
      createdPessoa = await this.pessoaDAO.createPessoa(pessoa);
    } else {
      return res.status(400).json({ error: "CPF or CNPJ é obrigatório" });
    }
    
    return res.status(201).json(createdPessoa);
  }

  public async updatePessoa(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (id) {
      const pessoaUpdates = req.body;
      await this.pessoaDAO.updatePessoa(id, pessoaUpdates);
    } else {
      return res.status(400).json({ error: "É necessário informar um id válido" });
    }
       
    return res.status(200).send();
  }
  
  public async deletePessoa(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    
    if (id) {
      await this.pessoaDAO.deletePessoa(id);
    } else {
      return res.status(400).json({ error: "É necessário informar um id válido" });
    }
    
    return res.status(200).send();
  }

  public async getAllPessoas(req: Request, res: Response): Promise<Response> {
    const Pessoas = await this.pessoaDAO.getAllPessoas();
    return res.json(Pessoas);
  }
}
