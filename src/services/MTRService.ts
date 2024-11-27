import axios from "axios";
import { LoteManifestoJSON } from "../models/Manifesto/LoteManifestoJSON";
import { ResiduoDTO, ClasseDTO, EstadoFisicoDTO, AcondicionamentoDTO, TecnologiaDestinacaoDTO, UnidadeDTO } from "../models/Residuos";	
import { ManifestoJSONDto } from "../models/Manifesto/ManifestoJSONDto";

interface ApiResponse {
    codigo: number;
    descricao: string;
    residuos?: ResiduoDTO[];
    classes?: ClasseDTO[];
    estadosFisicos?: EstadoFisicoDTO[];
    acondicionamentos?: AcondicionamentoDTO[];
    tecnologias?: TecnologiaDestinacaoDTO[];
    unidades?: UnidadeDTO[];
}

class MTRService {
    private apiUrl: string;

    constructor(environment: "production" | "homologation") {
        this.apiUrl =
            environment === "production"
                ? "https://mtr.fepam.rs.gov.br/mtrservice"
                : "https://miramichi.procergs.com.br/mtrservice";
    }

    private async postRequest<T>(
        endpoint: string,
        login: string,
        senha: string,
        cnp: string
    ): Promise<T | undefined> {
        try {
            const response = await axios.post<ApiResponse>(
                `${this.apiUrl}/${endpoint}/${login}/${senha}/${cnp}`,
                {},
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status = 200) {
                const data = response.data;
                if (Array.isArray(data)) {
                    return data as T;
                } else {
                    throw new Error(`Unexpected response type for endpoint ${endpoint}`);
                }
            } else {
                throw new Error(`Erro ${response.data.codigo}: ${response.data.descricao}`);
            }
        } catch (error) {
            console.error("Erro ao consultar a API MTR:", error);
            throw error;
        }
    }

    async retornaListaResiduo(login: string, senha: string, cnp: string): Promise<ResiduoDTO[]> {
        const result = await this.postRequest<ResiduoDTO[]>("retornaListaResiduo", login, senha, cnp);
        return result || [];
    }

    async retornaListaClasse(login: string, senha: string, cnp: string): Promise<ClasseDTO[]> {
        const result = await this.postRequest<ClasseDTO[]>("retornaListaClasse", login, senha, cnp);
        return result || [];
    }

    async retornaListaEstadoFisico(login: string, senha: string, cnp: string): Promise<EstadoFisicoDTO[]> {
        const result = await this.postRequest<EstadoFisicoDTO[]>("retornaListaEstadoFisico", login, senha, cnp);
        return result || [];
    }

    async retornaListaAcondicionamento(login: string, senha: string, cnp: string): Promise<AcondicionamentoDTO[]> {
        const result = await this.postRequest<AcondicionamentoDTO[]>("retornaListaAcondicionamento", login, senha, cnp);
        return result || [];
    }

    async retornaListaTecnologia(login: string, senha: string, cnp: string): Promise<TecnologiaDestinacaoDTO[]> {
        const result = await this.postRequest<TecnologiaDestinacaoDTO[]>("retornaListaTecnologia", login, senha, cnp);
        return result || [];
    }

    async retornaListaUnidade(login: string, senha: string, cnp: string): Promise<UnidadeDTO[]> {
        const result = await this.postRequest<UnidadeDTO[]>("retornaListaUnidade", login, senha, cnp);
        return result || [];
    }

    async enviarLoteManifesto(
        login: string, 
        senha: string,
        cnp: string, 
        manifestos: ManifestoJSONDto[]
    ): Promise<LoteManifestoJSON> {
        try {
            // Construir o corpo da requisição com as chaves como strings
            const requestBody = {
                "login": login,
                "senha": senha,
                "cnp": cnp,
                "manifestoJSONDtos": manifestos.map(manifesto => ({
                    "seuCodigoReferencia":"123456", 
                    "cnpTransportador": manifesto.cnpTransportador,
                    "codUnidadeTransportador": manifesto.codUnidadeTransportador,
                    "cnpDestinador": manifesto.cnpDestinador,
                    "codUnidadeDestinador": manifesto.codUnidadeDestinador,
                    "manifTransportadorDataExpedicao": manifesto.manifTransportadorDataExpedicao,
                    "manifTransportadorNomeMotorista": manifesto.manifTransportadorNomeMotorista,
                    "manifTransportadorPlacaVeiculo": manifesto.manifTransportadorPlacaVeiculo,
                    "manifGeradorNomeResponsavel": manifesto.manifGeradorNomeResponsavel,
                    "manifGeradorCargoResponsavel": manifesto.manifGeradorCargoResponsavel,
                    "itemManifestoJSONs": manifesto.itemManifestoJSONs
                }))
            };

            console.log('Request body formatado:', JSON.stringify(requestBody, null, 2));

            const response = await axios.post<LoteManifestoJSON>(
                //`https://miramichi.procergs.com.br/mtrservice/salvarManifestoLote`,
                `${this.apiUrl}/salvarManifestoLote`,
                requestBody,
                { 
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
            );

            if (response.status === 200 && response.data.manifestoJSONDtos) {
                console.log('response.data', response.data);
                return response.data;
            }
            
            throw new Error(
                response.status === 200
                    ? `Erro ao enviar lote de manifestos: ${JSON.stringify(response.data)}`
                    : `Erro ${response.status}: ${response.statusText}`
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao consultar a API MTR:", {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
            } else {
                console.error("Erro ao consultar a API MTR:", error);
            }
            throw error;
        }
    }
}

export default MTRService;
