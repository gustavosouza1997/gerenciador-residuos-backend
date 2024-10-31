export interface ItemManifestoJSONDto {
    codigoSequencial?: number;
    justificativa?: string;
    codigoInterno?: string;
    quantidade: number;
    residuo: string;
    codigoAcondicionamento?: number;
    codigoClasse?: number;
    codigoTecnologia?: number;
    codigoTipoEstado?: number;
    codigoUnidade?: number;
    manifestoItemObservacao?: string;
    manifestoItemCodInterno?: string;
    manifestoItemCodInternoDestinador?: string;
    tipoDensidadeValor?: string;
    tipoDensidadeUnidade?: string;
}