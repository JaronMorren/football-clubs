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
  ): Promise<void> => {
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
}
export default MatchesController;
// Italo Moura helped me write this function
