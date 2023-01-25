import { Request, Response } from 'express';
import Leaderboard from '../service/leadbords.service';

export default class LeaderboardController {
  constructor(private leaderBoardService = new Leaderboard()) {}

  getHomeTeamStats = async (_req: Request, res: Response) => {
    try {
      const result = await this.leaderBoardService.generateStatsHomeMatches();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  };
}
