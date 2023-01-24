// import * from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';

config();

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtSecret as string);
    return decoded;
  } catch (err) {
    return null;
  }
};

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  const decoded = verifyToken(token);

  if (decoded === null) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};

export default validateJWT;
