import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { Request, Response } from "express";

export class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return res.status(200).json({
            message: "Login realizado com sucesso",
            user: userCredential.user,
        });
    } catch (error) {
        return res.status(401).json({
            message: "Erro ao autenticar usuário",
            error: (error as Error).message,
        });
    }
  }

  public async logout(req: Request, res: Response): Promise<Response> {
    try {
        await signOut(auth);
        return res.status(200).json({ message: "Logout realizado com sucesso" });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao realizar logout",
            error: (error as Error).message,
        });
    }
  }
}