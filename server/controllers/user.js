import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db_config';
import '@babel/polyfill';
import '@babel/plugin-transform-regenerator';


const signup = async (req, res) => {
  const emailExist = `SELECT * FROM users WHERE email = '${req.body.email}';`;

  if (emailExist) {
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
  console.log(newUser.password);

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
};

export default signup;
