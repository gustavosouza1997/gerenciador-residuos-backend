export class Residuo {
    quantidade: number;
    residuo: string;
    codigoAcondicionamento: number;
    codigoClasse: number;
    codigoTecnologia: number;
    codigoTipoEstado: number;
    codigoUnidade: number;
    manifestoItemObservacao?: string;

    constructor (quantidade: number, residuo: string, codigoAcondicionamento: number, codigoClasse: number, codigoTecnologia: number, codigoTipoEstado: number, codigoUnidade: number, manifestoItemObservacao: string, manifestoItemCodInterno: string, manifestoItemCodInternoDestinador: string, tipoDensidadeValor: string, tipoDensidadeUnidade: string) {
        this.quantidade = quantidade;
        this.residuo = residuo;
        this.codigoAcondicionamento = codigoAcondicionamento;
        this.codigoClasse = codigoClasse;
        this.codigoTecnologia = codigoTecnologia;
        this.codigoTipoEstado = codigoTipoEstado;
        this.codigoUnidade = codigoUnidade;
        this.manifestoItemObservacao = manifestoItemObservacao;
    }
}