import ILeaderboard from '../interfaces/ILeaderboard';
import sequelize from '../models';
import awayLeaderboard from '../queries/awayLeaderboardQuery';
import homeLeaderboard from '../queries/homeLeaderboardQuery';

class LeaderboardService {
  public getHomeLeaderboard = async (): Promise<ILeaderboard[]> => {
    const [leaderboard] = await sequelize.query(homeLeaderboard);
    return leaderboard as ILeaderboard[];
  };

  public getAwayLeaderboard = async (): Promise<ILeaderboard[]> => {
    const [leaderboard] = await sequelize.query(awayLeaderboard);
    return leaderboard as ILeaderboard[];
  };
}
export default LeaderboardService;
