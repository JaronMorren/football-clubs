import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utilities/authorisation';

const validateToken = (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;
  console.log(authorization);
  if (!authorization) {
    return response.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = verifyToken(authorization);
    request.body = { payload };
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token must be a valid token' });
  }
};
export default validateToken;
// Monitor Gabriel Gonçalves helped me write this validation middleware
