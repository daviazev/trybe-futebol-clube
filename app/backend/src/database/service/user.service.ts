import { hash, compare } from 'bcryptjs';
import User from '../models/Users';

export default class UserService {
  login = async (email: string, password: string): Promise<boolean> => {
    await User.findOne({ where: { email } });

    const encryptPassword = await hash(password, 10);

    const isEqual = await compare(password, encryptPassword);

    return isEqual;
  };
}
