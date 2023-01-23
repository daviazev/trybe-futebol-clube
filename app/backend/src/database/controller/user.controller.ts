import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import UserService from '../service/user.service';

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
}
