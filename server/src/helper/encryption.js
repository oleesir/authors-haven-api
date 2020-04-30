import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const generateToken = payload => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

const encrpytPassword = password => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export { encrpytPassword, generateToken, comparePassword };
