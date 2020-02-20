import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db_config';
import '@babel/polyfill';
import '@babel/plugin-transform-regenerator';


const Users = {
  async signup(req, res) {
    const emailExist = `SELECT * FROM users WHERE email = '${req.body.email}';`;
    const { rows: [foundEmail] } = await pool.query(emailExist);

    if (foundEmail) {
      return res.status(409).send({
        status: 409,
        error: 'Email already exists',
      });
    }
    const newUser = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: await bcrypt.hash(req.body.password, 10),
    };

    const userInsert = `INSERT INTO users (email, firstName, lastName, password) VALUES('${newUser.email}','${newUser.firstName}','${newUser.lastName}','${newUser.password}') RETURNING *;`;
    const { rows: [userGet] } = await pool.query(userInsert);
    const token = jwt.sign({
      id: userGet.id,
      email: userGet.email,
    }, 'jwtprivatekey');

    res.status(201).send({
      status: 201,
      data: {
        token,
        id: userGet.id,
        firstName: userGet.firstname,
        lastName: userGet.lastname,
        email: userGet.email,
      },
    });
  },

  async login(req, res) {
    const emailExist = `SELECT * FROM users WHERE email = '${req.body.email}';`;
    const { rows: [foundEmail] } = await pool.query(emailExist);

    if (!foundEmail) {
      return res.status(404).send({
        status: 404,
        error: 'Email does not exists',
      });
    }

    const userLogin = {
      email: req.body.email,
      password: req.body.password,
    };

    const getUser = `SELECT * FROM users WHERE email = '${userLogin.email}';`;
    const { rows: [gotUser] } = await pool.query(getUser);
    const token = jwt.sign({
      id: gotUser.id,
      email: gotUser.email,
      type: gotUser.type,
      is_admin: gotUser.is_admin,
    }, 'jwtprivatekey');

    res.status(200).send({
      status: 200,
      data: {
        token,
        id: gotUser.id,
        firstName: gotUser.firstname,
        lastName: gotUser.lastname,
        email: gotUser.email,
      },
    });
  },

  async create_account(req, res) {
    const userAccount = {
      createdOn: req.body.date,
      firstName: req.Data.firstName,
      lastName: req.Data.lastName,
      type: req.body.type,
    };

    let owner = `${userAccount.firstName} ${userAccount.lastName}`;
    let { email } = req.Data;

    if (userAccount.type !== 'current' && userAccount.type !== 'savings') {
      return res.status(400).send({
        status: 400,
        message: 'User account have to be either savings or current',
      });
    }

    const enterData = `INSERT INTO account(createdon,owner,email,type) VALUES('${userAccount.createdOn}','${owner}','${email}','${userAccount.type}') RETURNING *;`;
    const { rows: [getuserAccount] } = await pool.query(enterData);

    console.log(getuserAccount);

    res.status(201).send({
      status: 201,
      data: {
        accountNumber: getuserAccount.accountno,
        firstName: userAccount.firstName,
        lastName: userAccount.lastName,
        email: getuserAccount.email,
        type: userAccount.type,
        openingBalance: getuserAccount.balance,
      },
    });
  },

  async getAccountsByEmail(req, res) {
    let { email } = req.params;

    if (email !== req.Data.email) {
      return res.status(400).send({
        status: 400,
        error: 'email not found',
      });
    }

    const email1 = `SELECT * FROM account WHERE email = '${email}';`;
    const { rows } = await pool.query(email1);

    const accounts = [];
    rows.forEach((accountGot) => {
      const account_details = {
        createdOn: accountGot.createdon,
        accountNumber: accountGot.accountno,
        type: accountGot.type,
        status: accountGot.status,
        balance: accountGot.balance,
      };
      accounts.push(account_details);
    });

    return res.status(200).send({
      status: 200,
      data: accounts,
    });
  },
};

export default Users;
