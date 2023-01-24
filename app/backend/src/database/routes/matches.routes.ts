import { Router } from 'express';
import MatchesController from '../controller/matches.controller';

import validateJWT from '../middlewares/jwt.middleware';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.findMatchesByStatus);

router.get('/matches', matchesController.findAllMatches);

router.post('/matches', validateJWT, matchesController.createMatch);

export default router;
