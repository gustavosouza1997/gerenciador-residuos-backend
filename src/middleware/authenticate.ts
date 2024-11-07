import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdminConfig';

// Extending the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({ message: 'Token não fornecido' });
            return;
        }
        
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Erro na autenticação:", error);
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

