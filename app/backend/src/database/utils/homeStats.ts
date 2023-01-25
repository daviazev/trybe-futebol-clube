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
  efficiency: string,
}

interface teste {
  name: string,
  goalsFavor: number[],
  goalsOwn: number[],
}

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

// const sortStats = (teamsStats: IHomeTeamsStats[]) => {
//   const ordainedTeams = teamsStats.sort((a, b) => {
//     if (b.totalPoints !== a.totalPoints) {
//       return b.totalPoints - a.totalPoints;
//     }

//     return b.goalsBalance - a.goalsBalance;
//   });

//   return ordainedTeams;
// };

const generateStatsHomeMatches = (results: teste[]) => {
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

  return stats as IHomeTeamsStats[];
};

export default generateStatsHomeMatches;
