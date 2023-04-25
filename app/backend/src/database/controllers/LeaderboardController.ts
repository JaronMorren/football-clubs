import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public getHomeLeaderboard = async (_request: Request, response: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.service.getHomeLeaderboard();
      return response.status(200).json(leaderboard);
    } catch (error) { next(error); }
  };
}
export default LeaderboardController;
