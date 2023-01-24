import { Request, Response, NextFunction } from 'express';
import TeamsService from '../service/teams.service';

const validateIfTeamsExists = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  const teamsService = new TeamsService();

  const result = teamsService.doesTeamsExists(homeTeamId, awayTeamId);

  if (!result) return res.status(404).json({ message: 'There is no team with such id!' });

  return next();
};

export default validateIfTeamsExists;
