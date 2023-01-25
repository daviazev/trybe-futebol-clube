import { Request, Response } from 'express';
import Leaderboard from '../service/leadbords.service';
import generateStatsHomeMatches from '../utils/homeStats';

// interface IHomeTeamsStats {
//   name: string,
//   totalPoints: number,
//   totalGames: number,
//   totalVictories: number,
//   totalDraws: number,
//   totalLosses: number,
//   goalsFavor: number,
//   goalsOwn: number,
//   goalsBalance: number,
//   efficiency: string,
// }

interface teste {
  name: string,
  goalsFavor: number[],
  goalsOwn: number[],
}

export default class LeaderboardController {
  constructor(private leaderBoardService = new Leaderboard()) {}

  getHomeTeamStats = async (_req: Request, res: Response) => {
    try {
      const result = await this.leaderBoardService.getHomeTeamStats();
      const organizando = generateStatsHomeMatches(result[0] as unknown as teste[]);
      return res.status(200).json(organizando);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  };
}
