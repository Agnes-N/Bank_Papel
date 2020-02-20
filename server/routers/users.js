import express from 'express';
import users from '../controllers/user';
import validateSignup from '../middleware/signupValidate';
import validateLogin from '../middleware/loginValid';
import auth from '../middleware/auth';
import validateAccount from '../middleware/validateAcc';

const router = express.Router();

router.post('/auth/signup', validateSignup, users.signup);
router.post('/auth/login', validateLogin, users.login);
router.post('/accounts', [auth, validateAccount], users.create_account);


router.get('/user/:email/accounts', auth, users.getAccountsByEmail);

export default router;
