// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import swaggerDocument from '../swagger.json';
import sendError from './middlewares/errorHandler';
import routes from './routes/index';
import passportSetup from './helper/passportSetup';

const app = express();

const allowOrigins = ['http://localhost:3000', 'https://authors-haven-react.herokuapp.com'];
const corsOptions = {
	credentials: true,
	origin: (origin, callback) => {
		if (allowOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

passportSetup(passport);

app.use(cors(corsOptions));

app.use('/api/v1', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({ status: 'success', message: 'Authors Haven API' }));

app.get('*', (req, res) => res.status(404).json({ status: 'failure', error: 'Not found' }));

app.use(sendError);

export default app;
