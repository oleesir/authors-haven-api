require('dotenv').config();

const {
  DB_USER, DB_HOST, DB_PASSWORD, DB_NAME, DB_NAME_TEST, DATABASE_URL, DB_DIALECT
} = process.env;


module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT
  },
  test: {
    username: DB_USER || 'postgres',
    password: DB_PASSWORD || '',
    database: DB_NAME_TEST || 'authors_haven_test',
    host: DB_HOST || 'localhost',
    dialect: DB_DIALECT || 'postgres'
  },
  production: {
    use_env_variable: DATABASE_URL
  }
};
