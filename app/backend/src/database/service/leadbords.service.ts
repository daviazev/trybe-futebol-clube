import { Sequelize } from 'sequelize';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

interface IHomeTeamsStats {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

interface teste {
  teamName: string,
  golsFavorArray: number[],
  goalsOwnArray: number[],
}

// const query = `SELECT T.team_name, JSON_ARRAYAGG(M.home_team_goals) as goalsFavorArray,
// JSON_ARRAYAGG(M.away_team_goals) as goalsOwnArray FROM TRYBE_FUTEBOL_CLUBE.matches AS M
// INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS T
// ON T.id = M.home_team_id WHERE M.in_progress = 0 group by T.team_name`;

export default class Leaderboard {
  getHomeTeamStats = async (): Promise<teste[]> => {
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

    return teamGoals as unknown as teste[];
  };

  calculateDraws = (homeGoals: number[], awayGoals: number[]) => {
    let count = 0;

    homeGoals.forEach((value, index) => {
      if (value === awayGoals[index]) { count += 1; }
    });

    return count;
  };

  calculatePoints = (homeGoals: number[], awayGoals: number[]) => {
    let count = 0;

    homeGoals.forEach((value, index) => {
      if (value > awayGoals[index]) { count += 1; }
    });

    return count * 3 + this.calculateDraws(homeGoals, awayGoals);
  };

  calculateLosses = (homeGoals: number[], awayGoals: number[]) => {
    let count = 0;

    homeGoals.forEach((value, index) => {
      if (value < awayGoals[index]) { count += 1; }
    });

    return count;
  };

  calculateEfficiency = (homeGoals: number[], awayGoals: number[]) => {
    const totalPoints = this.calculatePoints(homeGoals, awayGoals);
    const totalGames = homeGoals.length;
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Math.round(efficiency * 100) / 100;
  };

  generateStatsHomeMatches = async (): Promise<IHomeTeamsStats[]> => {
    const results = await this.getHomeTeamStats();

    const stats = results.map(({ teamName, golsFavorArray, goalsOwnArray }:teste) => {
      return {
        name: teamName,
        totalPoints: this.calculatePoints(golsFavorArray, goalsOwnArray),
        totalGames: golsFavorArray.length,
        totalVictories: this.calculatePoints(golsFavorArray, goalsOwnArray) / golsFavorArray.length,
        totalDraws: this.calculateDraws(golsFavorArray, goalsOwnArray),
        totalLosses: this.calculateLosses(golsFavorArray, goalsOwnArray),
        goalsFavor: golsFavorArray.reduce((acc, curr) => acc + curr),
        goalsOwn: goalsOwnArray.reduce((acc, curr) => acc + curr),
        goalsBalance: golsFavorArray.reduce((acc, curr) => acc + curr)
        - goalsOwnArray.reduce((acc, curr) => acc + curr),
        efficiency: this.calculateEfficiency(golsFavorArray, goalsOwnArray),
      };

      return { teamName, golsFavorArray, goalsOwnArray };
    });

    return stats as IHomeTeamsStats[];
  };
}
