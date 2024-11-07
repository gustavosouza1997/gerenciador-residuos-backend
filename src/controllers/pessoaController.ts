import { Request, Response } from "express";
import { PessoaDAO } from "../dao/pessoaDAO";
import { PessoaFisica } from "../models/PessoaFisica";
import { PessoaJuridica } from "../models/PessoaJuridica";

export class PessoaController {
  private pessoaDAO = new PessoaDAO();

  public async createPessoa(req: Request, res: Response): Promise<void> {
    const { endereco, telefone, email, nome, cpf, razaoSocial, cnpj, transportador, destinador, gerador, motorista } = req.body;

    let createdPessoa;

    if (cpf && !cnpj) {
      const pessoa: PessoaFisica = new PessoaFisica(nome, cpf, endereco, telefone, email, transportador, gerador, destinador, motorista);
      createdPessoa = await this.pessoaDAO.createPessoa(pessoa);
    } else if (cnpj && !cpf) {
      const pessoa: PessoaJuridica = new PessoaJuridica(razaoSocial, cnpj, endereco, telefone, email, transportador, gerador, destinador);
      createdPessoa = await this.pessoaDAO.createPessoa(pessoa);
    } else {
      res.status(400).json({ error: "CPF or CNPJ é obrigatório" });
    }
    
    res.status(201).json(createdPessoa);
  }

  public async getPessoaByField(req: Request, res: Response): Promise<void> {
    const { field, value } = req.body;

    console.log("getPessoa "+ field, value);    

    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }

    const Pessoa = await this.pessoaDAO.findPessoaByField(field, value);
    Pessoa ? res.json(Pessoa) : res.status(404).json({ error: "Pessoa not found" });
  }

  public async updatePessoa(req: Request, res: Response): Promise<void> {
    const { field, value } = req.body;
    
    console.log("UpdatePessoa " + field, value);   
    
    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }
    const PessoaUpdates = req.body;
    await this.pessoaDAO.updatePessoa(field, value, PessoaUpdates);
    res.status(204).send();
  }
  
  public async deletePessoa(req: Request, res: Response): Promise<void> {
    const { field, value } = req.body;
    
    if (!field || !value) {
      res.status(400).json({ error: "É necessário informar um campo e valor" });
    }
  
    try {
      await this.pessoaDAO.deletePessoa(field, value);
      res.status(204).send();  // Resposta para exclusão bem-sucedida
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir pessoa." });
    }
  }

  public async getAllPessoas(req: Request, res: Response): Promise<void> {
    const Pessoas = await this.pessoaDAO.getAllPessoas();
    res.json(Pessoas);
  }
}
