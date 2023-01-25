import Matches from '../models/Matches';

import { IInfosFromBD } from '../interfaces';

const query = `SELECT T.team_name as name, JSON_ARRAYAGG(M.home_team_goals) as goalsFavor,
JSON_ARRAYAGG(M.away_team_goals) as goalsOwn FROM TRYBE_FUTEBOL_CLUBE.matches AS M
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS T
ON T.id = M.home_team_id WHERE M.in_progress = 0 group by name;`;

export default class Leaderboard {
  getHomeTeamStats = async () => {
    const result = await Matches.sequelize?.query(query);
    return result as IInfosFromBD[];
  };
}
