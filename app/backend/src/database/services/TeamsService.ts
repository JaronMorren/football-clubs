import { ModelStatic } from 'sequelize';
import Teams from '../models/TeamsModel';
import ITeams from '../interfaces/ITeams';

class TeamsService {
  private teamsModel : ModelStatic<Teams>;

  constructor(teamsModel:ModelStatic<Teams>) {
    this.teamsModel = teamsModel;
  }

  public async getAllTeams(): Promise<ITeams[]> {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
    //  I based this modelstatic interface on this thread: https://trybecourse.slack.com/archives/C03MSCCRPAQ/p1680107639238259
  }

  public async getTeamByID(ID: string):Promise<Teams | null> {
    const team = await this.teamsModel.findByPk(ID);
    return team;
  } // needed to change the ID parameter to string instead of number because getTeamByID would receive a string as argument in the controller layer
}
export default TeamsService;
