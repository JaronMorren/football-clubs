import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public getAllMatches = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { inProgress } = request.query;
      if (inProgress) {
        const matchesInProgress = await this.service.getMatchesByProgress(inProgress as string);
        response.status(200).json(matchesInProgress);
      }
      const matches = await this.service.getAllMatches();
      response.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
  // Italo Moura helped me write this function

  public finishMatch = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;

      await this.service.finishMatch(id);
      return response.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  public updateMatch = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const { homeTeamGoals, awayTeamGoals } = request.body;
    try {
      await this.service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      response.status(200).json({ homeTeamGoals, awayTeamGoals });
    } catch (error) {
      next(error);
    }
  };
}
export default MatchesController;
