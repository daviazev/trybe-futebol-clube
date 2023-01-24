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
}
