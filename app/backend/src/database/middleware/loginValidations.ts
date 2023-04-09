import { Request, Response, NextFunction } from 'express';

const validateLogin = (request: Request, response: Response, next: NextFunction) => {
  const { email, password } = request.body;
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

  if (!email || !password) {
    return response.status(400).json({ message: 'All fields must be filled' });
  }
  if (password.length < 6 || !emailRegex.test(email)) {
    return response.status(401).json({ message: 'Invalid email or password' });
  }

  return next();
};

export default validateLogin;
