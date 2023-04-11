import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Users from '../models/UsersModel';

class LoginService {
  model: ModelStatic<Users> = Users;

  public async userLogin(email: string, password: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return { type: 401, message: 'Invalid email or password' };
    }
    const isCorrectPassword = bcrypt.compareSync(password, user.dataValues.password);
    if (!isCorrectPassword) {
      return { type: 401, message: 'Invalid email or password' };
    }
    if (isCorrectPassword) {
      return { type: null, message: user.role };
    }
  }
}
// Daniel Röhe and Ligia Bicalho helped me write this function
// https://trybecourse.slack.com/archives/C03NDPN4132/p1681089516466109

export default LoginService;
