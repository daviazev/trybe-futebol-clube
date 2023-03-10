import Matches from '../models/Matches';

import { IInfosFromBD } from '../interfaces';

const queryHome = `SELECT T.team_name as name, JSON_ARRAYAGG(M.home_team_goals) as goalsFavor,
JSON_ARRAYAGG(M.away_team_goals) as goalsOwn FROM TRYBE_FUTEBOL_CLUBE.matches AS M
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS T
ON T.id = M.home_team_id WHERE M.in_progress = 0 group by name;`;

const queryAway = `SELECT T.team_name as name, JSON_ARRAYAGG(M.away_team_goals) as goalsFavor,
JSON_ARRAYAGG(M.home_team_goals) as goalsOwn FROM TRYBE_FUTEBOL_CLUBE.matches AS M
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS T
ON T.id = M.away_team_id WHERE M.in_progress = 0 group by name;`;

export default class Leaderboard {
  getHomeTeamStats = async (path: string) => {
    const homeOrAway = path === 'home' ? queryHome : queryAway;
    const result = await Matches.sequelize?.query(homeOrAway);
    return result as IInfosFromBD[];
  };
}
