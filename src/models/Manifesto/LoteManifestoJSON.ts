import { ManifestoJSONDto } from './ManifestoJSONDto';

export interface LoteManifestoJSON {
    senha: string;
    cnp: string;
    codUnidade?: number;
    login: string;
    manifestoJSONDtos: ManifestoJSONDto[];
}