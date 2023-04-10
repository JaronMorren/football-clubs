import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Users from '../models/UsersModel';

class LoginService {
  model: ModelStatic<Users> = Users;

  public async userLogin(email: string, password: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const correctPassword = bcrypt.compareSync(password, user.dataValues.password);
    if (correctPassword) {
      return { correctPassword };
    }
  }

  public async getUserRole(id: number) {
    const user = await this.model.findOne({ where: { id } });
    if (!user) { return null; }

    const { userRole } = user.dataValues;
    return userRole;
  }
}
export default LoginService;
// Monitor Gabriel Gonçalves helped me write this service
