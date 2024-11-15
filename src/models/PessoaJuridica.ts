import { Pessoa } from './Pessoa';

export class PessoaJuridica extends Pessoa {
    private cnpj: string;
    private razaoSocial: string;

    constructor (razaoSocial: string, cnpj: string, endereco: string, telefone: string, email: string, transportador: boolean, gerador: boolean, destinador: boolean) {
        super(endereco, telefone, email, transportador, gerador, destinador);
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
    }

    // getRazaoSocial(): string {
    //     return this.razaoSocial;
    // }

    // setRazaoSocial(razaoSocial: string): void {
    //     this.razaoSocial = razaoSocial;
    // }

    // getCnpj(): string {
    //     return this.cnpj;
    // }

    // setCnpj(cnpj: string): void {
    //     this.cnpj = cnpj;
    // }

    public toPlainObject(): object {
        return {
            ...super.toPlainObject(),
            razaoSocial: this.razaoSocial,
            cnpj: this.cnpj,
        };
    }
}