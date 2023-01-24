import { Router } from 'express';
import MatchesController from '../controller/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.findMatchesByStatus);

router.get('/matches', matchesController.findAllMatches);

export default router;
