import express from 'express';
import users from '../controllers/user';
import validateSignup from '../middleware/signupValidate';
import validateLogin from '../middleware/loginValid';

const router = express.Router();

router.post('/auth/signup', validateSignup, users.signup);
router.post('/auth/login', validateLogin, users.login);

export default router;
