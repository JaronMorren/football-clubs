import { ModelStatic } from 'sequelize';
import Matches from '../models/MatchesModel';
import Teams from '../models/TeamsModel';

class MatchesService {
  model: ModelStatic<Matches> = Matches;
  teams: ModelStatic<Teams> = Teams;

  async getAllMatches(): Promise<Matches[]> {
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
}
export default MatchesService;
// Italo Moura helped me write this function
