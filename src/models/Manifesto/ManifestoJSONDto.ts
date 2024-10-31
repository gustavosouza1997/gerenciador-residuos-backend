import { ItemManifestoJSONDto } from './ItemManifestoJSONDto';

export interface ManifestoJSONDto {
    manifestoCodigo?: number;
    retornoCodigo?: number;
    cnpGerador?: string;
    codUnidadeGerador?: number;
    cnpTransportador: string;
    codUnidadeTransportador: number;
    cnpDestinador: string;
    codUnidadeDestinador: number;
    cnpArmazenador?: string;
    codUnidadeArmazenador?: number;
    manifData?: string;
    manifDataExpedicao?: string;
    manifObservacao?: string;
    manifGeradorNomeResponsavel: string;
    manifGeradorCargoResponsavel: string;
    manifTransportadorNomeMotorista?: string;
    manifTransportadorPlacaVeiculo?: string;
    manifTransportadorDataExpedicao?: string;
    retorno?: string;
    itemManifestoJSONs: ItemManifestoJSONDto[];
}
