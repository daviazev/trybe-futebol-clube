import Matches from '../models/Matches';
import Teams from '../models/Teams';

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
}
