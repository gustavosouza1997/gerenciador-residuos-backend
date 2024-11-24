export class Veiculo {
    private placa: string;
    private marca: string;
    private modelo: string;

    constructor(placa: string, marca: string, modelo: string) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
    }

    public toPlainObject(): object {
        return {
            placa: this.placa,
            marca: this.marca,
            modelo: this.modelo
        };
    }
}