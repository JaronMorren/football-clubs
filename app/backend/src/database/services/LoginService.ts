import { ModelStatic } from 'sequelize';
import Users from '../models/UsersModel';
import { IUsers } from '../interfaces/IUsers';

class LoginService {
  model: ModelStatic<Users> = Users;

  public async getUserByEmail(email: string) : Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  public async getUserByID(id: number): Promise<IUsers | null> {
    const user = await this.model.findByPk(
      id,
      { attributes: { exclude: ['password', 'id', 'username', 'email'] } },
    );
    return user;
    // this function fetches users by their id via the find by primary key method and excludes their sensitive information like password etc.
  }
}
// Daniel Röhe and Ligia Bicalho helped me write this function
// https://trybecourse.slack.com/archives/C03NDPN4132/p1681089516466109

export default LoginService;
