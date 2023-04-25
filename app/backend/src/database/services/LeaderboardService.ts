import ILeaderboard from '../interfaces/ILeaderboard';
import sequelize from '../models';
import homeLeaderboard from '../queries/homeLeaderboardQuery';

class LeaderboardService {
  public getHomeLeaderboard = async (): Promise<ILeaderboard[]> => {
    const [leaderboard] = await sequelize.query(homeLeaderboard);
    return leaderboard as ILeaderboard[];
  };
}
export default LeaderboardService;
