import { compare } from 'bcryptjs';
import User from '../models/Users';

export default class UserService {
  validatePassword = async (password: string, password2: string) => compare(password, password2);

  login = async (email: string, password: string): Promise<boolean> => {
    const user = await User.findOne({ where: { email } });

    if (user && await this.validatePassword(password, user.password)) return true;

    return false;
  };
}
