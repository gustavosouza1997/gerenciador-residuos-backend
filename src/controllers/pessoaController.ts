import { Request, Response } from "express";
import { PessoaDAO } from "../dao/pessoaDAO";
import { createId } from "@paralleldrive/cuid2";
import { PessoaFisica } from "../models/PessoaFisica";
import { PessoaJuridica } from "../models/PessoaJuridica";

export class PessoaController {
  private pessoaDAO = new PessoaDAO();

  public async createPessoa(req: Request, res: Response): Promise<Response> {
    const { endereco, telefone, email, nome, cpf, razaoSocial, cnpj } = req.body;

    let createdPessoa;

    if (cpf && !cnpj) {
      const pessoa: PessoaFisica = { id: createId(), endereco, telefone, email, nome, cpf };
      createdPessoa = await this.pessoaDAO.createPessoa(pessoa);
    } else if (cnpj && !cpf) {
      const pessoa: PessoaJuridica = { id: createId(), endereco, telefone, email, razaoSocial, cnpj };
      createdPessoa = await this.pessoaDAO.createPessoa(pessoa);
    } else {
      return res.status(400).json({ error: "CPF or CNPJ é obrigatório" });
    }
    
    return res.status(201).json(createdPessoa);
  }

  public async getPessoaByField(req: Request, res: Response): Promise<Response> {
    const { field } = req.body;
    const { value  } = req.params;

    console.log("getPessoa "+field, value);    

    if (!field || !value) {
      return res.status(400).json({ error: "É necessário informar um campo e valor" });
    }
    const Pessoa = await this.pessoaDAO.findPessoaByField(field, value);
    return Pessoa ? res.json(Pessoa) : res.status(404).json({ error: "Pessoa not found" });
  }

  public async updatePessoa(req: Request, res: Response): Promise<Response> {
    const { field, value } = req.params;
    
    console.log("UpdatePessoa " + field, value);   
    
    if (!field || !value) {
      return res.status(400).json({ error: "É necessário informar um campo e valor" });
    }
    const PessoaUpdates = req.body;
    await this.pessoaDAO.updatePessoa(field, value, PessoaUpdates);
    return res.status(204).send();
  }

  public async deletePessoa(req: Request, res: Response): Promise<Response> {
    const { field, value } = req.body;
    
    if (!field || !value) {
      return res.status(400).json({ error: "É necessário informar um campo e valor" });
    }
    await this.pessoaDAO.deletePessoa(field, value);
    return res.status(204).send();
  }

  public async getAllPessoas(req: Request, res: Response): Promise<Response> {
    const Pessoas = await this.pessoaDAO.getAllPessoas();
    return res.json(Pessoas);
  }
}
