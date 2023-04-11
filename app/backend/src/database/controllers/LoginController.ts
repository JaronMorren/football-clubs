import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { createToken } from '../utilities/authorisation';

class LoginController {
  loginService: LoginService = new LoginService();

  public async userLogin(request: Request, response: Response) {
    const { email, password } = request.body;
    const loginResult = await this.loginService.userLogin(email, password);
    if (!loginResult) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }

    if (loginResult) {
      const token = createToken(loginResult);
      return response.status(200).json({ token });
    }
  }
  // Gabriel Gonçalves helped me write this function

  public getUserRole = (request: Request, response: Response) => {
    try {
      const { payload } = request.body.user;
      // const { id } = payload;

      const userRole = { role: payload.role };
      return response.status(200).json({ userRole });
    } catch (error) {
      return response.status(500).json({ message: 'Internal Error' });
    }
  };
}
// Daniel Röhe, Josiel Costa and Ligia Bicalho helped me write this function
// https://trybecourse.slack.com/archives/C03NDPN4132/p1681089516466109
export default LoginController;
