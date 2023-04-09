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
}
export default LoginService;
