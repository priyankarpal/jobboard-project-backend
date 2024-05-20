import "dotenv/config";
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface ExtendedRequest extends Request {
    user?: string | jwt.JwtPayload;

}

const jwtAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const token = req.header('authorization')?.split(' ')[1];

    // If token is missing, return 401 Unauthorized
    if (!token) return res.sendStatus(401);

    try {
        // Get JWT secret from environment variable
        const jwtSecret = process.env.JWT_SECRET;

        // If JWT secret is not defined, return 500 Internal Server Error
        if (!jwtSecret) {
            console.error('JWT secret is not defined');
            return res.status(500).json({ error: 'JWT secret is not defined' });
        }

        // Verify JWT token
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Error in jwtAuth:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export { jwtAuth };
