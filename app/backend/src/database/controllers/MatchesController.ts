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

  public createMatch = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = request.body;
      const homeTeam = await this.service.getMatchByID(homeTeamId);
      const awayTeam = await this.service.getMatchByID(awayTeamId);

      if (!homeTeam || !awayTeam) {
        return response.status(404)
          .json({ message: 'There is no team with such id!' });
      }
      if (homeTeamId === awayTeamId) {
        return response.status(422)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const createdMatch = await this.service
        .createMatch(homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals);
      return response.status(201).json(createdMatch);
    } catch (error) {
      next(error);
    }
  };
}
export default MatchesController;
