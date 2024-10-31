import { Request, Response } from "express";
import { UserDAO } from "../dao/userDAO";
import { User } from "../models/User";
import { createId } from "@paralleldrive/cuid2";

export class UserController {
  private userDAO = new UserDAO();

  public async createUser(req: Request, res: Response): Promise<Response> {
    const { pessoaFisicaId, pessoaJuridicaId, password } = req.body;
    const user: User = { id: createId(), pessoaFisicaId, pessoaJuridicaId, password };
    const createdUser = await this.userDAO.createUser(user);
    return res.status(201).json(createdUser);
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await this.userDAO.findUserById(id);
    return user ? res.json(user) : res.status(404).json({ error: "User not found" });
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const userUpdates = req.body;
    await this.userDAO.updateUser(id, userUpdates);
    return res.status(204).send();
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    await this.userDAO.deleteUser(id);
    return res.status(204).send();
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await this.userDAO.getAllUsers();
    return res.json(users);
  }
}
