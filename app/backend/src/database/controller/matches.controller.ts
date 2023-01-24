import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

const erro500 = 'Erro interno';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  findAllMatches = async (_req: Request, res: Response) => {
    try {
      const matches = await this.matchesService.getAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json({ message: erro500 });
    }
  };

  findMatchesByStatus = async (req: Request, res: Response) => {
    try {
      if (!req.query.inProgress) return await this.findAllMatches(req, res);

      const inProgress = req.query.inProgress === 'true';
      const matches = await this.matchesService.findMatchesByStatus(inProgress);
      return res.status(200).json(matches);
    } catch (error) {
      return res.status(500).json({ message: erro500 });
    }
  };

  createMatch = async (req: Request, res: Response) => {
    try {
      const updatedMatch = await this.matchesService.createMatch(req.body);
      return res.status(201).json(updatedMatch);
    } catch (error) {
      return res.status(500).json({ message: erro500 });
    }
  };

  finishMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const finish = await this.matchesService.finishMatch(Number(id));
      return res.status(200).json(finish);
    } catch (error) {
      return res.status(500).json({ message: erro500 });
    }
  };

  updateMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.matchesService
        .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: 'Match updated' });
    } catch (error) {
      return res.status(500).json({ message: erro500 });
    }
  };
}
