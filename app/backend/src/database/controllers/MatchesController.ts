import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public getAllMatches = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const matches = await this.service.getAllMatches();
      response.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}
export default MatchesController;
// Italo Moura helped me write this function
