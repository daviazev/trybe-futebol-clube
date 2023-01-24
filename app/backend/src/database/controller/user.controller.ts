import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import UserService from '../service/user.service';
import User from '../models/Users';

config();

const jwtSecret = process.env.JWT_SECRET;

export default class UserController {
  constructor(private userSerice = new UserService()) {}

  static generateToken(email: string, password: string): string {
    const payload = { email, password };
    return sign(payload, jwtSecret as string, { algorithm: 'HS256', expiresIn: '7d' });
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await this.userSerice.login(email, password);

    if (!result) return res.status(401).json({ message: 'Incorrect email or password' });

    const token = UserController.generateToken(email, password);

    return res.status(200).json({ token });
  };

  getUserRoleFromToken = async (req: Request, res: Response) => {
    const token = req.header('authorization');

    try {
      const decoded = verify(token as string, jwtSecret as string) as { email: string };
      const { email } = decoded;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      return res.status(200).json({ role: user.role });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  };
}
