import { Request, Response, NextFunction } from 'express';

const validateCredentials = (email: string, password: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const testEmail = emailRegex.test(email);
  return testEmail && password.length > 8;
};

const validateLoginFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if ([email, password].some((element) => !element)) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!validateCredentials(email, password)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  return next();
};

export default validateLoginFields;
