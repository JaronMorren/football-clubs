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
  } // Italo Moura helped me write this function

  public async finishMatch(id: string) {
    const finishedMatch = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return finishedMatch;
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public async createMatch(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ) {
    const { id } = await this.model.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true });
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true };
  }
}

export default MatchesService;
