import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

export const generateToken = (
	payload,
	secret = SECRET_KEY,
	expiresIn = '1day',
) => jwt.sign(payload, secret, { expiresIn });


