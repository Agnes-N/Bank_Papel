import pool from '../config/db_config';

const users = `
DROP TABLE IF EXISTS users, account CASCADE;
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(35) UNIQUE NOT NULL,
  firstName VARCHAR(21) NOT NULL,
  lastName VARCHAR(22) NOT NULL,
  password VARCHAR(300) NOT NULL ,
  type  VARCHAR(25) NOT NULL DEFAULT 'CLIENT',
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS account(
  id SERIAL PRIMARY KEY,
  accountNo INT UNIQUE,
  createdOn VARCHAR(100) NOT NULL,
  owner VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  status VARCHAR(100) NOT NULL DEFAULT 'DRAFT',
  balance FLOAT DEFAULT 0.00
);

INSERT INTO users (email, firstname,lastname,password,type,is_admin) VALUES ('agnes@gmail.com','agnes','reina','$2b$10$8skfDzkgRSkUB64YPtFvGOc3P8Viug8XgIRTvujRBm7eH14ILnZhy','admin','true')`;

const createTables = async () => {
  await pool.query(users).then(() => {
    console.log('TABLES CREATED ');
    pool.end();
  }).catch(() => {
    process.exit(0);
  });
};

createTables();
