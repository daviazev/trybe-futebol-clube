import { Router } from 'express';
import MatchesController from '../controller/matches.controller';

import validateJWT from '../middlewares/jwt.middleware';
import preventDuplicateTeamsMiddleware from '../middlewares/matches.midleware';
import validateIfTeamsExists from '../middlewares/teams.middleware';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.findMatchesByStatus);

router.get('/matches', matchesController.findAllMatches);

router.post(
  '/matches',
  preventDuplicateTeamsMiddleware,
  validateIfTeamsExists,
  validateJWT,
  matchesController.createMatch,
);

router.patch('/matches/:id/finish', matchesController.finishMatch);

router.patch('/matches/:id', matchesController.updateMatch);

export default router;
