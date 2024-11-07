export class Veiculo {
    private placa: string;
    private marca: string;
    private modelo: string;

    constructor(placa: string, marca: string, modelo: string) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
    }

    public getPlaca(): string {
        return this.placa;
    }

    public setPlaca(placa: string): void {
        this.placa = placa;
    }

    public getMarca(): string {
        return this.marca;
    }

    public setMarca(marca: string): void {
        this.marca = marca;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public setModelo(modelo: string): void {
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