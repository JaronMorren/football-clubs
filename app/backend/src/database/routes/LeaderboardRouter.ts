import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const controller = new LeaderboardController();

leaderboardRouter.get('/home', controller.getHomeLeaderboard);

export default leaderboardRouter;
