import { Sequelize } from 'sequelize';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

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
//   efficiency: number,
// }

// const query = `SELECT T.team_name, JSON_ARRAYAGG(M.home_team_goals) as goalsFavorArray,
// JSON_ARRAYAGG(M.away_team_goals) as goalsOwnArray FROM TRYBE_FUTEBOL_CLUBE.matches AS M
// INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS T
// ON T.id = M.home_team_id WHERE M.in_progress = 0 group by T.team_name`;

export default class Leaderboard {
  getHomeTeamStats = async () => {
    const teamGoals = await Matches.findAll({
      attributes: [
        'homeTeamId',
        [Sequelize.fn('JSON_ARRAYAGG', Sequelize.col('homeTeamGoals')), 'goalsFavorArray'],
        [Sequelize.fn('JSON_ARRAYAGG', Sequelize.col('awayTeamGoals')), 'goalsOwnArray'],
      ],
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
        required: true,
      }],
      where: { inProgress: false },
      group: ['homeTeam.teamName'],
      raw: true,
    });
    return teamGoals;
  };

  //   generateStatsHomeMatches = async () => {
  //     const results = await this.getHomeTeamStats();

//     const stats = results.map((team) => {});
//   };
}
