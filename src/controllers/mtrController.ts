import { Request, Response } from "express";
import MTRService from "../services/MTRService";

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

    public enviarManifesto(req: Request, res: Response): Promise<Response> {
        return this.handleRequest(req, res, this.mtrService.enviarLoteManifesto, "Erro ao consultar unidades");
    }
}