import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

interface JwtPayload {
    userId: number;
}

declare module "express" {
    export interface Request {
      user?: JwtPayload; 
    }
  }

export function authenticateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const authHeader: string | undefined = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // El token se envía en formato 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ message: 'Invalid Token' });
        }

        req.user = decoded as JwtPayload;
        next();
    });
}
