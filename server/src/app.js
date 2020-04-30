import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import sendError from './middlewares/errorHandler';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({ status: 'success', message: 'Authors Haven API' }));


app.get('*', (req, res) => res.status(404).send({
  status: 'failure',
  error: 'Not found'
}));

app.use(sendError);


export default app;
