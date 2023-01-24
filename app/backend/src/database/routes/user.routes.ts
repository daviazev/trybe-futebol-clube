import { Router } from 'express';
import UserController from '../controller/user.controller';

import validateLoginFields from '../middlewares/login.middeware';

const router = Router();

const userController = new UserController();

router.post('/login', validateLoginFields, userController.login);

router.get('/login/validate', userController.getUserRoleFromToken);

export default router;
