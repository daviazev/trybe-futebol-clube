// import { Sequelize } from 'sequelize';
// import Matches from '../models/Matches';
// import Teams from '../models/Teams';

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
//   efficiency: string,
// }

// interface teste {
//   name: string,
//   goalsFavor: number[],
//   goalsOwn: number[],
// }

// // const query = `SELECT T.team_name, JSON_ARRAYAGG(M.home_team_goals) as goalsFavorArray,
// // JSON_ARRAYAGG(M.away_team_goals) as goalsOwnArray FROM TRYBE_FUTEBOL_CLUBE.matches AS M
// // INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS T
// // ON T.id = M.home_team_id WHERE M.in_progress = 0 group by T.team_name`;

// export default class Leaderboard {
//   getHomeTeamStats = async (): Promise<teste[]> => {
//     const teamGoals = await Matches.findAll({
//       attributes: [
//         [Sequelize.fn('JSON_ARRAYAGG', Sequelize.col('homeTeamGoals')), 'goalsFavor'],
//         [Sequelize.fn('JSON_ARRAYAGG', Sequelize.col('awayTeamGoals')), 'goalsOwn'],
//       ],
//       include: [{
//         model: Teams,
//         as: 'homeTeam',
//         attributes: ['teamName'],
//         required: true,
//       }],
//       where: { inProgress: false },
//       group: ['homeTeam.teamName'],
//       raw: true,
//     });

//     return teamGoals as unknown as teste[];
//   };

//   calculateDraws = (homeGoals: number[], awayGoals: number[]): number => {
//     let count = 0;

//     homeGoals.forEach((value, index) => {
//       if (value === awayGoals[index]) { count += 1; }
//     });

//     return count;
//   };

//   calculatePoints = (homeGoals: number[], awayGoals: number[]): number => {
//     let count = 0;

//     homeGoals.forEach((value, index) => {
//       if (value > awayGoals[index]) { count += 1; }
//     });

//     return count * 3 + this.calculateDraws(homeGoals, awayGoals);
//   };

//   calculateLosses = (homeGoals: number[], awayGoals: number[]): number => {
//     let count = 0;

//     homeGoals.forEach((value, index) => {
//       if (value < awayGoals[index]) { count += 1; }
//     });

//     return count;
//   };

//   calculateVictories = (homeGoals: number[], awayGoals: number[]): number => {
//     let count = 0;
//     homeGoals.forEach((value, index) => {
//       if (value > awayGoals[index]) { count += 1; }
//     });
//     return count;
//   };

//   calculateEfficiency = (homeGoals: number[], awayGoals: number[]): string => {
//     const totalPoints = this.calculatePoints(homeGoals, awayGoals);
//     const totalGames = homeGoals.length;
//     const efficiency = (totalPoints / (totalGames * 3)) * 100;
//     if (efficiency === 0) return '0.00';
//     return `${Math.round(efficiency * 100) / 100}`;
//   };

//   sortStats = (teamsStats: IHomeTeamsStats[]) => {
//     const ordainedTeams = teamsStats.sort((a, b) => {
//       if (b.totalPoints !== a.totalPoints) {
//         return b.totalPoints - a.totalPoints;
//       }

//       return b.goalsBalance - a.goalsBalance;
//     });

//     return ordainedTeams;
//   };

//   generateStatsHomeMatches = async (): Promise<IHomeTeamsStats[]> => {
//     const results = await this.getHomeTeamStats();

//     const stats = results.map(({ name, goalsFavor, goalsOwn }:teste) => {
//       return {
//         name,
//         totalPoints: this.calculatePoints(goalsFavor, goalsOwn),
//         totalGames: goalsFavor.length,
//         totalVictories: this.calculateVictories(goalsFavor, goalsOwn),
//         totalDraws: this.calculateDraws(goalsFavor, goalsOwn),
//         totalLosses: this.calculateLosses(goalsFavor, goalsOwn),
//         goalsFavor: goalsFavor.reduce((acc, curr) => acc + curr),
//         goalsOwn: goalsOwn.reduce((acc, curr) => acc + curr),
//         goalsBalance: goalsFavor.reduce((acc, curr) => acc + curr)
//         - goalsOwn.reduce((acc, curr) => acc + curr),
//         efficiency: this.calculateEfficiency(goalsFavor, goalsOwn),
//       };

//       return { name, goalsFavor, goalsOwn };
//     });

//     return this.sortStats(stats as IHomeTeamsStats[]);
//   };
// }
