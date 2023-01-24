import { Request, Response } from 'express';
// import { sign, verify } from 'jsonwebtoken';
// import { config } from 'dotenv';
import TeamsService from '../service/teams.service';

// config();

// const jwtSecret = process.env.JWT_SECRET;

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public findAllTeams = async (_req: Request, res: Response) => {
    try {
      const teams = await this.teamsService.findAllTeams();
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  };

  public findTeamById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const team = await this.teamsService.findTeamById(Number(id));
      if (!team) return res.status(404).json({ message: 'Team does not exist' });
      return res.status(200).json(team);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  };
}
