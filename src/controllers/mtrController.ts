import { Request, Response } from "express";
import MTRService from "../services/MTRService";
import { ManifestoJSONDto } from "../models/Manifesto/ManifestoJSONDto";

export class MTRController {
    private mtrService = new MTRService("production");

    private async handleRequest<T>(
        req: Request,
        res: Response,
        serviceMethod: (login: string, senha: string, cnp: string) => Promise<T>,
        successMessage: string
    ): Promise<Response> {
        const { login, senha, cnp } = req.body;

        try {
            const data = await serviceMethod.call( this.mtrService, login, senha, cnp);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: successMessage, error: (error as Error).message });
        }
    }

    public getListaAcondicionamento(req: Request, res: Response): Promise<Response> {
        return this.handleRequest(req, res, this.mtrService.retornaListaAcondicionamento, "Erro ao consultar acondicionamentos");
    }

    public getListaClasse(req: Request, res: Response): Promise<Response> {
        return this.handleRequest(req, res, this.mtrService.retornaListaClasse, "Erro ao consultar classes");
    }

    public getListaEstadoFisico(req: Request, res: Response): Promise<Response> {
        return this.handleRequest(req, res, this.mtrService.retornaListaEstadoFisico, "Erro ao consultar estados físicos");
    }

    public getListaResiduo(req: Request, res: Response): Promise<Response> {
        return this.handleRequest(req, res, this.mtrService.retornaListaResiduo, "Erro ao consultar resíduos");
    }

    public getListaTecnologia(req: Request, res: Response): Promise<Response> {
        return this.handleRequest(req, res, this.mtrService.retornaListaTecnologia, "Erro ao consultar tecnologias");
    }

    public getListaUnidade(req: Request, res: Response): Promise<Response> {
        return this.handleRequest(req, res, this.mtrService.retornaListaUnidade, "Erro ao consultar unidades");
    }

    public async enviarManifesto(req: Request, res: Response): Promise<Response> {
        const { login, senha, cnp, manifestoJSONDtos } = req.body;

        // Validação dos campos obrigatórios
        if (!login || !senha || !cnp || !manifestoJSONDtos) {
            return res.status(400).json({ 
                message: "Campos obrigatórios não fornecidos", 
                required: ["login", "senha", "cnp", "manifestoJSONDtos"] 
            });
        }
        try {
            const result = await this.mtrService.enviarLoteManifesto(login, senha, cnp, manifestoJSONDtos);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao enviar manifesto:", error);
            return res.status(500).json({
                message: "Erro ao enviar o manifesto", 
                error: (error as Error).message 
            });
        }
    }
}