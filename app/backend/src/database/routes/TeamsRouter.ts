import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.getAllTeams);
teamsRouter.get('/:id', teamsController.getTeamByID);

export default teamsRouter;

// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back/9.4/9.4/src/routes/UserRoutes.ts
