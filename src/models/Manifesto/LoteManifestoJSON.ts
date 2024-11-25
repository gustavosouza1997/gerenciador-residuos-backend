import { ManifestoJSONDto } from './ManifestoJSONDto';

export interface LoteManifestoJSON {
    codUnidade?: number;
    manifestoJSONDtos: ManifestoJSONDto[];
}