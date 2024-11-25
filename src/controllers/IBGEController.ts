import IBGEService from "../services/IBGEService";
import { Request, Response } from "express";

export class IBGEController {
    private ibgeService = new IBGEService();

    public async getUFs(req: Request, res: Response): Promise<Response> {
        const ufs = await this.ibgeService.getUFs();
        return res.json(ufs);
    }

    public async getCities(req: Request, res: Response): Promise<Response> {
        const { uf } = req.params;

        if (uf) {
            const ufs = await this.ibgeService.getCities(uf);
            return res.json(ufs);
        }
        
        return res.status(400).json({ error: "UF não informada" });
    }
}