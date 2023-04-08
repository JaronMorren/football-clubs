import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Users from '../models/UsersModel';
import { createToken } from '../utilities/authorisation';

class ServiceLogin {
  model: ModelStatic<Users> = Users;

  async userLogin(email: string, password: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const correctPassword = bcrypt.compareSync(password, user.dataValues.password);
    if (correctPassword) {
      const userToken = createToken(user);
      return { correctPassword, userToken };
    }
  }
}
export default ServiceLogin;
