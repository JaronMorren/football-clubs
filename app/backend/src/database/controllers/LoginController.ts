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

  public async getUserRole(request: Request, response: Response) {
    const { payload } = request.body.user;
    const { id } = payload;

    const userRole = await this.loginService.getUserRole(id);
    return response.status(200).json({ userRole });
  }
}

export default LoginController;
// Monitor Gabriel Gonçalves helped me write this controller
