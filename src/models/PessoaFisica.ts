import { Pessoa } from './Pessoa';

export interface PessoaFisica extends Pessoa {
    nome: string;
    cpf: string;
}