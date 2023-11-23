import express, { Application } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middleware/globalErrorHandler';
import router from './routes';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.use(globalErrorHandler);

export default app;
