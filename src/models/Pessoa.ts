export abstract class Pessoa {
    private endereco: string;
    private telefone: string;
    private email: string;
    private transportador: boolean;
    private gerador: boolean;
    private destinador: boolean;    

    constructor(endereco: string, telefone: string, email: string, transportador: boolean, gerador: boolean, destinador: boolean) {
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.transportador = transportador;
        this.gerador = gerador;
        this.destinador = destinador;
    }

    public toPlainObject(): object {
        return {
            endereco: this.endereco,
            telefone: this.telefone,
            email: this.email,
            transportador: this.transportador,
            gerador: this.gerador,
            destinador: this.destinador
        };
    }
}