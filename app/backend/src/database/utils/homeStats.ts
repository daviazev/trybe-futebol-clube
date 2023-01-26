import { IHomeTeamsStats, IInfosFromBD } from '../interfaces';

const calculateDraws = (homeGoals: number[], awayGoals: number[]): number => {
  let count = 0;

  homeGoals.forEach((value, index) => {
    if (value === awayGoals[index]) { count += 1; }
  });

  return count;
};

const calculatePoints = (homeGoals: number[], awayGoals: number[]): number => {
  let count = 0;

  homeGoals.forEach((value, index) => {
    if (value > awayGoals[index]) { count += 1; }
  });

  return count * 3 + calculateDraws(homeGoals, awayGoals);
};

const calculateLosses = (homeGoals: number[], awayGoals: number[]): number => {
  let count = 0;

  homeGoals.forEach((value, index) => {
    if (value < awayGoals[index]) { count += 1; }
  });

  return count;
};

const calculateVictories = (homeGoals: number[], awayGoals: number[]): number => {
  let count = 0;
  homeGoals.forEach((value, index) => {
    if (value > awayGoals[index]) { count += 1; }
  });
  return count;
};

const calculateEfficiency = (homeGoals: number[], awayGoals: number[]): string => {
  const totalPoints = calculatePoints(homeGoals, awayGoals);
  const totalGames = homeGoals.length;
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  if (efficiency === 0) return '0.00';
  return `${Math.round(efficiency * 100) / 100}`;
};

const c = (
  totalPoints: number,
  totalGames: number,
) => {
  const generalEfficiency = (totalPoints / (totalGames * 3)) * 100;
  if (generalEfficiency === 0) return '0.00';
  return `${Math.round(generalEfficiency * 100) / 100}`;
};

const sortStats = (teamsStats: IHomeTeamsStats[]) => {
  const ordainedTeams = teamsStats.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }

    return b.goalsFavor - a.goalsFavor;
  });

  return ordainedTeams;
};

const generateStatsHomeMatches = (results: IInfosFromBD[]) => {
  const stats = results.map(({ name, goalsFavor, goalsOwn }) => ({
    name,
    totalPoints: calculatePoints(goalsFavor, goalsOwn),
    totalGames: goalsFavor.length,
    totalVictories: calculateVictories(goalsFavor, goalsOwn),
    totalDraws: calculateDraws(goalsFavor, goalsOwn),
    totalLosses: calculateLosses(goalsFavor, goalsOwn),
    goalsFavor: goalsFavor.reduce((acc, curr) => acc + curr),
    goalsOwn: goalsOwn.reduce((acc, curr) => acc + curr),
    goalsBalance: goalsFavor.reduce((acc, curr) => acc + curr)
        - goalsOwn.reduce((acc, curr) => acc + curr),
    efficiency: calculateEfficiency(goalsFavor, goalsOwn),
  }));

  return sortStats(stats) as IHomeTeamsStats[];
};

export const generateGeneralStats = (home: IHomeTeamsStats[], away: IHomeTeamsStats[]) => {
  const result = home.map((e, i) => {
    if (e.name === away[i].name) {
      return ({ name: e.name,
        totalPoints: e.totalPoints + away[i].totalPoints,
        totalGames: e.totalGames + away[i].totalGames,
        totalVictories: e.totalVictories + away[i].totalVictories,
        totalDraws: e.totalDraws + away[i].totalDraws,
        totalLosses: e.totalLosses + away[i].totalLosses,
        goalsFavor: e.goalsFavor + away[i].goalsFavor,
        goalsOwn: e.goalsOwn + away[i].goalsOwn,
        goalsBalance: e.goalsBalance + away[i].goalsBalance,
        efficiency: c(e.totalPoints + away[i].totalPoints, e.totalGames + away[i].totalGames),
      });
    }

    return e;
  });

  return sortStats(result) as IHomeTeamsStats[];
};

export default generateStatsHomeMatches;
