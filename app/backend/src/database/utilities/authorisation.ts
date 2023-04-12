import * as jwt from 'jsonwebtoken';
import { IUsers } from '../interfaces/IUsers';

const secret = process.env.JWT_SECRET || 'secret';
const jwtConfigurations : jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1h',
};
const createToken = (payload: IUsers):string => {
  const { id, email } = payload;
  const token = jwt.sign({ id, email }, secret, jwtConfigurations);
  return token;
};

// Ligia Bicalho helped me to write this function
// https://trybecourse.slack.com/archives/C03NDPN4132/p1681089516466109

const verifyToken = (token: string) => {
  const decodedToken = jwt.verify(token, secret);
  return decodedToken;
};

export {
  createToken,
  verifyToken,
};
// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back-end/6.4/src/auth/authFuctions.js
