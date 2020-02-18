
import express from 'express';
import users from '../controllers/user';
import users_signup from '../middleware/signup-valid';

const router = express.Router();

router.post('/auth/signup', users_signup, users);

export default router;
