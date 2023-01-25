// import { Sequelize } from 'sequelize';
import Matches from '../models/Matches';
// import Teams from '../models/Teams';

interface teste {
  name: string,
  goalsFavor: number[],
  goalsOwn: number[],
}

const query = `SELECT T.team_name as name, JSON_ARRAYAGG(M.home_team_goals) as goalsFavor,
JSON_ARRAYAGG(M.away_team_goals) as goalsOwn FROM TRYBE_FUTEBOL_CLUBE.matches AS M
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS T
ON T.id = M.home_team_id WHERE M.in_progress = 0 group by name;`;

export default class Leaderboard {
  // getHomeTeamStats = async (): Promise<teste[]> => {
  //   const teamGoals = await Matches.findAll({
  //     attributes: [
  //       [Sequelize.fn('JSON_ARRAYAGG', Sequelize.col('homeTeamGoals')), 'goalsFavor'],
  //       [Sequelize.fn('JSON_ARRAYAGG', Sequelize.col('awayTeamGoals')), 'goalsOwn'],
  //     ],
  //     include: [{
  //       model: Teams,
  //       as: 'homeTeam',
  //       attributes: ['teamName'],
  //       required: true,
  //     }],
  //     where: { inProgress: false },
  //     group: ['homeTeam.teamName'],
  //     raw: true,
  //   });

  //   return teamGoals as unknown as teste[];
  // };

  getHomeTeamStats = async () => {
    const result = await Matches.sequelize?.query(query);
    return result as teste[];
  };
}
