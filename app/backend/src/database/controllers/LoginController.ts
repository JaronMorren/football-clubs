import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  loginService: LoginService = new LoginService();

  async userLogin(request: Request, response: Response) {
    const { email, password } = request.body;
    const loginResult = await this.loginService.userLogin(email, password);
    if (!loginResult) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }
    if (loginResult) {
      response.status(200).json(loginResult);
    }
  }
}

export default LoginController;
