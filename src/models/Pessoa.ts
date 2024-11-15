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

    // public getEndereco(): string {
    //     return this.endereco;
    // }

    // public setEndereco(endereco: string): void {
    //     this.endereco = endereco;
    // }

    // public getTelefone(): string {
    //     return this.telefone;
    // }

    // public setTelefone(telefone: string): void {
    //     this.telefone = telefone;
    // }

    // public getEmail(): string {
    //     return this.email;
    // }

    // public setEmail(email: string): void {
    //     this.email = email;
    // }

    // public isTransportador(): boolean {
    //     return this.transportador;
    // }

    // public setTransportador(transportador: boolean): void {
    //     this.transportador = transportador;
    // }

    // public isGerador(): boolean {
    //     return this.gerador;
    // }

    // public setGerador(gerador: boolean): void {
    //     this.gerador = gerador;
    // }

    // public isDestinador(): boolean {
    //     return this.destinador;
    // }

    // public setDestinador(destinador: boolean): void {
    //     this.destinador = destinador;
    // }

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