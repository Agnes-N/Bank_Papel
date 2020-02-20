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

};


export default Users;
