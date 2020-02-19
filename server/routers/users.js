import express from 'express';
import users from '../controllers/user';
import validateSignup from '../middleware/signupValidate';

const router = express.Router();

router.post('/auth/signup', validateSignup, users.signup);

export default router;
