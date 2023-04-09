import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

const createToken = (param: object) => {
  const jwtConfig = jwt.sign({ param }, secret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
  return jwtConfig;
};

const verifyToken = (token: string) => {
  const verify = jwt.verify(token, secret);
  return verify;
};

export {
  createToken,
  verifyToken,
};
// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back-end/6.4/src/auth/authFuctions.js
