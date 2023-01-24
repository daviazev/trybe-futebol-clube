import { Op } from 'sequelize';
import Teams from '../models/Teams';

export default class TeamsService {
  findAllTeams = async (): Promise<Teams[]> => {
    const allTeams = await Teams.findAll();
    return allTeams;
  };

  findTeamById = async (id: number): Promise<Teams | null> => {
    const team = await Teams.findByPk(id);
    return team;
  };

  doesTeamsExists = async (homeTeamId: number, awayTeamId: number): Promise<boolean> => {
    const count = await Teams.count({
      where: {
        id: {
          [Op.or]: [homeTeamId, awayTeamId],
        },
      },
    });

    return count === 2;
  };
}
