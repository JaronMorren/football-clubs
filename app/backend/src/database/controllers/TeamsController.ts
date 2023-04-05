import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import Teams from '../models/TeamsModel';

class TeamsController {
  service: TeamsService;

  constructor() {
    this.service = new TeamsService(Teams);
  }

  public getAllTeams = async (
    _request: Request,
    response: Response,
    next:NextFunction,
  ):
  Promise<void> => {
    try {
      const allTeams = await this.service.getAllTeams();
      response.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  };

  public getTeamByID = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = request.params;
      const team = await this.service.getTeamByID(id);
      // getTeamByID receives a string as argument instead of number so I had to change it in the service layer
      response.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
export default TeamsController;
// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back/9.4/9.4/src/controllers/userController.ts
