import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import Teams from '../models/TeamsModel';

class TeamsController {
  service: TeamsService;

  constructor() {
    this.service = new TeamsService(Teams);
  }

  getAllTeams = async (_request: Request, response: Response): Promise<void> => {
    try {
      const allTeams = await this.service.getAllTeams();
      response.status(200).json(allTeams);
    } catch (error) {
      response.status(500).json(error);
    }
  };
}
export default TeamsController;
// https://github.com/tryber/sd-025-b-live-lectures/blob/lecture/back/9.4/9.4/src/controllers/userController.ts
