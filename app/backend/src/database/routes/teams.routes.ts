import { Router } from 'express';
import TeamsController from '../controller/teams.controller';

const router = Router();

const teamsController = new TeamsController();

router.get('/teams', teamsController.findAllTeams);

router.get('/teams/:id', teamsController.findTeamById);

export default router;
