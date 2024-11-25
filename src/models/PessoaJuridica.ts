import { Pessoa } from './Pessoa';

export class PessoaJuridica extends Pessoa {
    private cnpj: string;
    private razaoSocial: string;

    constructor (razaoSocial: string, cnpj: string, endereco: string, uf: string, municipio: string, telefone: string, email: string, transportador: boolean, gerador: boolean, destinador: boolean) {
        super(endereco, uf, municipio, telefone, email, transportador, gerador, destinador);
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
    }

    public toPlainObject(): object {
        return {
            ...super.toPlainObject(),
            razaoSocial: this.razaoSocial,
            cnpj: this.cnpj,
        };
    }
}