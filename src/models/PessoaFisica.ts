import { Pessoa } from './Pessoa';

export class PessoaFisica extends Pessoa {
    private nome: string;
    private cpf: string; 
    private motorista: boolean;

    constructor(nome: string, cpf: string, endereco: string, uf: string, municipio: string, telefone: string, email: string, transportador: boolean, gerador: boolean, destinador: boolean, motorista: boolean) {
        super(endereco, uf, municipio, telefone, email, transportador, gerador, destinador);        
        this.nome = nome;
        this.cpf = cpf;
        this.motorista = motorista;
    }

    public toPlainObject(): object {
        return {
            ...super.toPlainObject(),
            nome: this.nome,
            cpf: this.cpf,
            motorista: this.motorista
        };
    }
}