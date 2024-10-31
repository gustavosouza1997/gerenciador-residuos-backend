import { Pessoa } from './Pessoa';

export interface PessoaJuridica extends Pessoa {
    cnpj: string;
    razaoSocial: string;
}