import { ModelStatic } from 'sequelize';
import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

class MatchesService {
  model: ModelStatic<Matches> = Matches;
  teams: ModelStatic<Teams> = Teams;

  public async getAllMatches(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: this.teams,
          as: 'homeTeam',
        },
        {
          model: this.teams,
          as: 'awayTeam',
        },
      ],
    });
    return matches;
  }

  public async getMatchesByProgress(inProgress: string):Promise<Matches[]> {
    const matchesInProgress = await this.model.findAll({
      where: { inProgress: JSON.parse(inProgress.toLowerCase()) },
      include: [
        {
          model: this.teams,
          as: 'homeTeam',
        },
        {
          model: this.teams,
          as: 'awayTeam',
        }],
    });
    return matchesInProgress;
  }
}

export default MatchesService;
// Italo Moura helped me write this function
