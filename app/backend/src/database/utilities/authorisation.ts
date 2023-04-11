import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';
const jwtConfigurations : jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1h',
};
const createToken = (data: object) => {
  const token = jwt.sign({ data }, secret, jwtConfigurations);
  return token;
};
// Ligia Bicalho helped me to write this function
// https://trybecourse.slack.com/archives/C03NDPN4132/p1681089516466109

const verifyToken = (token: string) => {
  const verify = jwt.verify(token, secret);
  return verify;
};

export {
  createToken,
  verifyToken,
};
// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back-end/6.4/src/auth/authFuctions.js
