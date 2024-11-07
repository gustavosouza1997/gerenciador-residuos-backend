import { Pessoa } from './Pessoa';

export class PessoaFisica extends Pessoa {
    private nome: string;
    private cpf: string; 
    private motorista: boolean;

    constructor(nome: string, cpf: string, endereco: string, telefone: string, email: string, transportador: boolean, gerador: boolean, destinador: boolean, motorista: boolean) {
        super(endereco, telefone, email, transportador, gerador, destinador);        
        this.nome = nome;
        this.cpf = cpf;
        this.motorista = motorista;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    getCpf(): string {
        return this.cpf;
    }

    setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    isMotorista(): boolean {
        return this.motorista;
    }

    setMotorista(motorista: boolean): void {
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