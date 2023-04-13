import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middleware/tokenValidations';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.patch('/:id/finish', validateToken, matchesController.finishMatch);
matchesRouter.patch('/:id', validateToken, matchesController.updateMatch);

export default matchesRouter;
