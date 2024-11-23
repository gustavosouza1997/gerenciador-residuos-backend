import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Request, Response } from "express";

export class AuthController {
  // Método de login
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    // Validação dos campos
    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const token = await user.getIdToken();

      // Retornar apenas os dados essenciais
      return res.status(200).json({
        message: "Login realizado com sucesso",
        token,
        user: {
          uid: user.uid,
          email: user.email,
        },
      });
    } catch (error) {
      // Erros específicos do Firebase
      let errorMessage = "Erro ao autenticar usuário";
      if ((error as any).code === "auth/user-not-found") {
        errorMessage = "Usuário não encontrado.";
      } else if ((error as any).code === "auth/wrong-password") {
        errorMessage = "Senha incorreta.";
      }

      return res.status(401).json({
        message: errorMessage,
        error: (error as Error).message,
      });
    }
  }

  // Método de logout
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
