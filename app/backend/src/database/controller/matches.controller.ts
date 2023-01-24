import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  findAllMatches = async (_req: Request, res: Response) => {
    try {
      const matches = await this.matchesService.getAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  };

  findMatchesByStatus = async (req: Request, res: Response) => {
    try {
      if (!req.query.inProgress) return await this.findAllMatches(req, res);

      const inProgress = req.query.inProgress === 'true';
      const matches = await this.matchesService.findMatchesByStatus(inProgress);
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  };
}
