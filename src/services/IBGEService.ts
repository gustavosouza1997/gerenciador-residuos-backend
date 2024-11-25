import axios from "axios";

type IBGEUFResponse = {
    sigla: string;
    nome: string;
};

type IBGECITYResponse = {
    id: number;
    nome: string;
};

interface ApiResponse {
    ufs?: IBGEUFResponse[];
    cidades?: IBGECITYResponse[];
}


class IBGEService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "https://servicodados.ibge.gov.br/api/v1/localidades";
    }

    private async getRequest<T>(endpoint: string): Promise<T | undefined> {
        try {
            const response = await axios.get<ApiResponse>(`${this.apiUrl}/${endpoint}`);

            if (response.status = 200) {
                const data = response.data;
                if (Array.isArray(data)) {
                    return data as T;
                } else {
                    throw new Error(`Unexpected response type for endpoint ${endpoint}`);
                }
            } else {
                throw new Error(`Erro ao consultar a API IBGE: ${response.status}`);
            }
        } catch (error) {
            console.error("Erro ao consultar a API IBGE:", error);
            throw error;
        }
    }

    async getUFs(): Promise<IBGEUFResponse[]> {
        const result = await this.getRequest<IBGEUFResponse[]>("estados");
        return result || [];
    }

    async getCities(uf: string): Promise<IBGECITYResponse[]> {
        const result = await this.getRequest<IBGECITYResponse[]>(`estados/${uf}/municipios`);
        return result || [];
    }
}

export default IBGEService;