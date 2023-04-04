import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const router = Router();
const teamsController = new TeamsController();

router.post('/', teamsController.getAllTeams);

export default router;

// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back/9.4/9.4/src/routes/UserRoutes.ts
