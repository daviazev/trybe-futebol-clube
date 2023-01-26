import { Request, Response } from 'express';
import Leaderboard from '../service/leadbords.service';
import generateStatsHomeMatches, { generateGeneralStats } from '../utils/homeStats';

import { IInfosFromBD } from '../interfaces';

const erro500 = 'Erro interno';

export default class LeaderboardController {
  constructor(private leaderBoardService = new Leaderboard()) {}

  getHomeTeamStats = async (_req: Request, res: Response) => {
    try {
      const result = await this.leaderBoardService.getHomeTeamStats('home');
      const organizando = generateStatsHomeMatches(result[0] as unknown as IInfosFromBD[]);
      return res.status(200).json(organizando);
    } catch (error) {
      return res.status(500).json({ message: erro500 });
    }
  };

  getAwayTeamStats = async (_req: Request, res: Response) => {
    try {
      const result = await this.leaderBoardService.getHomeTeamStats('away');
      const organizando = generateStatsHomeMatches(result[0] as unknown as IInfosFromBD[]);
      return res.status(200).json(organizando);
    } catch (error) {
      return res.status(500).json({ message: erro500 });
    }
  };

  getGeneralStats = async (_req: Request, res: Response) => {
    try {
      const homeFromBD = await this.leaderBoardService.getHomeTeamStats('home');
      const sortHome = generateStatsHomeMatches(homeFromBD[0] as unknown as IInfosFromBD[]);

      const awayFromBD = await this.leaderBoardService.getHomeTeamStats('away');
      const sortAway = generateStatsHomeMatches(awayFromBD[0] as unknown as IInfosFromBD[]);

      const alphabeticalSortHome = sortHome.sort((a, b) => a.name.localeCompare(b.name));
      const alphabeticalSortAway = sortAway.sort((a, b) => a.name.localeCompare(b.name));

      const result = generateGeneralStats(alphabeticalSortHome, alphabeticalSortAway);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: erro500 });
    }
  };
}
