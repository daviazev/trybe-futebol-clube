import { Router } from 'express';
import LeaderboardController from '../controller/leadbords.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/leaderboard/home', leaderboardController.getHomeTeamStats);

router.get('/leaderboard/away', leaderboardController.getAwayTeamStats);

router.get('/leaderboard', leaderboardController.getGeneralStats);

export default router;
