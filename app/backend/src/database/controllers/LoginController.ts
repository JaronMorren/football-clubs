import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import LoginService from '../services/LoginService';
import { createToken } from '../utilities/authorisation';

class LoginController {
  loginService: LoginService = new LoginService();

  public async userLogin(request: Request, response: Response) {
    const { email, password } = request.body;
    const users = await this.loginService.getUserByEmail(email);
    if (!users) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }
    if (!bcrypt.compareSync(password, users.password || '')) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }

    if (users) {
      const token = createToken(users);
      return response.status(200).json({ token });
    }
  }

  // Gabriel Gonçalves helped me write this function

  public getUserRole = async (request: Request, response: Response) => {
    try {
      const { id } = request.body.user;
      const role = await this.loginService.getUserByID(id);

      return response.status(200).json(role);
    } catch (error) {
      return response.status(500).json({ message: 'Internal Error' });
    }
  };
}
// Daniel Röhe, Josiel Costa and Ligia Bicalho helped me write this function
// https://trybecourse.slack.com/archives/C03NDPN4132/p1681089516466109
export default LoginController;
