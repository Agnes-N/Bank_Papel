import pool from '../config/db_config';

const users = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(35) UNIQUE NOT NULL,
  firstName VARCHAR(21) NOT NULL,
  lastName VARCHAR(22) NOT NULL,
  password VARCHAR(300) NOT NULL ,
  type  VARCHAR(25) NOT NULL DEFAULT 'CLIENT',
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);`;

const tablesCreator = async () => {
  await pool.query(users).then(() => {
    console.log('test TABLES CREATED ');
    pool.end();
  }).catch(() => {
    process.exit(0);
  });
};

tablesCreator();
