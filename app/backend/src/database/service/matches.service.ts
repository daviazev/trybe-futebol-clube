import Matches from '../models/Matches';
import Teams from '../models/Teams';

interface IUpdateMatch {
  id?: number,
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export default class MatchesService {
  getAllMatches = async () => {
    const allMatches = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  };

  findMatchesByStatus = async (inProgress: boolean) => {
    const allMatches = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  };

  createMatch = async (params: IUpdateMatch): Promise<IUpdateMatch> => {
    await Matches.create({ ...params, inProgress: true });

    const updatedMatch = await Matches.findOne({ where: { ...params, inProgress: true } });

    return updatedMatch as IUpdateMatch;
  };
}
