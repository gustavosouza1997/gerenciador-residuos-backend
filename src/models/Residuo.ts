export class Residuo {
    quantidade: number;
    nomeResiduo: string;
    codigoResiduo: string;
    codigoAcondicionamento: number;
    codigoClasse: number;
    codigoTecnologia: number;
    codigoTipoEstado: number;
    codigoUnidade: number;
    manifestoItemObservacao?: string;
    dataCriacao: Date;
    dataEnvio?: Date;
    codManifesto?: number;

    constructor (quantidade: number, nomeResiduo: string, codigoResiduo: string, codigoAcondicionamento: number, codigoClasse: number, codigoTecnologia: number, codigoTipoEstado: number, codigoUnidade: number, manifestoItemObservacao: string, dataCriacao: Date, dataEnvio: Date, codManifesto: number) {
        this.quantidade = quantidade;
        this.nomeResiduo = nomeResiduo;
        this.codigoResiduo = codigoResiduo;
        this.codigoAcondicionamento = codigoAcondicionamento;
        this.codigoClasse = codigoClasse;
        this.codigoTecnologia = codigoTecnologia;
        this.codigoTipoEstado = codigoTipoEstado;
        this.codigoUnidade = codigoUnidade;
        this.manifestoItemObservacao = manifestoItemObservacao;
        this.dataCriacao = dataCriacao;
        this.dataEnvio = dataEnvio;
        this.codManifesto = codManifesto;
    }

    public toPlainObject(): object {
        return {
            quantidade: this.quantidade,
            nomeResiduo: this.nomeResiduo,
            codigoResiduo: this.codigoResiduo,
            codigoAcondicionamento: this.codigoAcondicionamento,
            codigoClasse: this.codigoClasse,
            codigoTecnologia: this.codigoTecnologia,
            codigoTipoEstado: this.codigoTipoEstado,
            codigoUnidade: this.codigoUnidade,
            manifestoItemObservacao: this.manifestoItemObservacao,
            dataCriacao: this.dataCriacao,
            dataEnvio: this.dataEnvio,
            codManifesto: this.codManifesto
        };
    }
}