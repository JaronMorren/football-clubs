import * as jwt from 'jsonwebtoken';
import { IUsers } from '../interfaces/IUsers';

const secret:string = process.env.JWT_SECRET || 'secret';

const generateToken = (data:IUsers) =>
  jwt.sign({ data }, secret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

const verifyToken = (token:string) => jwt.verify(token, secret);

export { generateToken, verifyToken };
