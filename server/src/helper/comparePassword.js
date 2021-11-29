import bcrypt from 'bcrypt';

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

export default comparePassword;
