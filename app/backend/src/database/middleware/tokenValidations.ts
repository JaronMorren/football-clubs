import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utilities/authorisation';

const validateToken = (request: Request, response: Response, next: NextFunction) => {
  try {
    const authorization = request.header('Authorization') as string; // typecasted Authorization as string only because it wouldn't be acceptable to insert string || undefined
    if (!authorization) {
      return response.status(401).json({ message: 'Token not found' });
    }
    const payload = verifyToken(authorization);
    request.body.user = payload;
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token must be a valid token' });
  }
};
export default validateToken;
// https://trybecourse.slack.com/archives/C03NDPN4132/p1681089516466109
